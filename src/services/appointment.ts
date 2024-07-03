/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { AppointmentModel } from 'src/models/appointment/index';
import { StandardError } from 'src/libs/standard-error';
import { BASIC_CONFIGURATION } from 'src/config';
import { IAvailableSlots } from 'src/services/types';
import { generateAppointmentSlots, isOperationalDay, isDateValid, dateToDateString } from 'src/libs/date';
import { ErrorCodes } from 'src/libs/errors';
import { Types } from 'mongoose';

export class AppointmentService {
    private appointmentModel: AppointmentModel;

    constructor(appointmentModel: AppointmentModel) {
        this.appointmentModel = appointmentModel;
    }

    async getAvailableSlots(selectedDate: string): Promise<IAvailableSlots[] | []> {
        const today = new Date();
        const selectedDateObj = new Date(selectedDate);
        const newSelectedDate = dateToDateString(selectedDateObj);

        if (!isDateValid(selectedDateObj)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'Date is not valid');
        }

        if (
            !isOperationalDay(selectedDateObj) ||
            BASIC_CONFIGURATION.dayOff.split(' ').includes(newSelectedDate) ||
            selectedDateObj < today
        ) {
            return [];
        }

        const appointmentSlots = generateAppointmentSlots(selectedDateObj);

        const getBookedAppointment = await this.appointmentModel.find({
            appointment_date: newSelectedDate
        });

        const availableSlots = appointmentSlots.map((slot: any) => {
            // Check if the current slot is booked
            getBookedAppointment.forEach((booked) => {
                if (booked.appointment_date === slot.date && booked.appointment_time === slot.time) {
                    slot.available_slots -= 1;
                }
            });

            return slot;
        });

        return availableSlots;
    }

    async createAppointment(date: string, time: string): Promise<IAvailableSlots> {
        const selectedDateObj = new Date(`${date} ${time}`);
        const newSelectedDate = dateToDateString(selectedDateObj);

        if (!isDateValid(selectedDateObj)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'Date or time is not valid');
        }

        if (!isOperationalDay(selectedDateObj)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, "Can't book the slot due to non operational days");
        }

        if (BASIC_CONFIGURATION.dayOff.split(' ').includes(newSelectedDate)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, "Can't book the slot due to day off");
        }

        const availableTime = await this.getAvailableSlots(newSelectedDate);

        const findTime = availableTime.find((slot: any) => slot.date === date && slot.time === time);

        if (!findTime || findTime.available_slots <= 0) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'The slot is not available');
        }

        const result = await this.appointmentModel.create({
            appointment_date: newSelectedDate,
            appointment_time: time
        });

        return {
            date: result.appointment_date,
            time: result.appointment_time
        };
    }

    async cancelAppointment(id: string): Promise<any> {
        const { ObjectId } = Types;

        if (!ObjectId.isValid(id)) {
            throw new StandardError(ErrorCodes.API_VALIDATION_ERROR, 'Id is valid');
        }

        const canceled = await this.appointmentModel.delete({
            _id: id
        });

        if (canceled.deletedCount === 0) {
            throw new StandardError(ErrorCodes.DOC_NOT_FOUND_ERROR, 'Appointment not found');
        }

        return {
            message: 'The appointment canceled!'
        };
    }
}
