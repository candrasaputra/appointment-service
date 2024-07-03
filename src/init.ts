import { RootController } from 'src/controllers/root';
import { AppointmentController } from 'src/controllers/appointment';
import { AppointmentService } from 'src/services/appointment';
import { Mongo } from 'src/libs/mongo';
import { AppointmentModel } from 'src/models/appointment';

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function init(): Promise<Record<string, any>> {
    // Initiate connection to DB
    const mongo = new Mongo();
    await mongo.connect();

    // Model
    const appointmentModel = new AppointmentModel();

    // Service
    const appointmentService = new AppointmentService(appointmentModel);

    // Controller
    const rootController = new RootController();
    const appointmentController = new AppointmentController(appointmentService);

    return {
        rootController,
        appointmentService,
        appointmentController
    };
}
