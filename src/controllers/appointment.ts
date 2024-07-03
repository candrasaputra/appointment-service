import { Request, Response, NextFunction, Router } from 'express';
import { AppointmentService } from 'src/services/appointment';

export class AppointmentController {
    private readonly appointmentService: AppointmentService;

    private router: Router;

    constructor(appointmentService: AppointmentService) {
        this.appointmentService = appointmentService;

        this.router = Router();
        this.router.post('/', this.createAppointment.bind(this));
        this.router.get('/', this.getAppointment.bind(this));
        this.router.delete('/:id/cancel', this.cancelAppointment.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    public async createAppointment(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { time, date } = req.body;

            const result = await this.appointmentService.createAppointment(date, time);
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    public async getAppointment(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const currentDate = new Date();
            const dateOnly = currentDate.toISOString().split('T')[0];
            const date = String(req.query.date || dateOnly);

            const result = await this.appointmentService.getAvailableSlots(date);

            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }

    public async cancelAppointment(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const result = await this.appointmentService.cancelAppointment(String(id));
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }
}
