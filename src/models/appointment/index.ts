import { BaseModel } from '../base';
import AppointmentMongoModel from './schema';

const errorCodes = {
    CREATE_DOC_ERROR: 'CREATE_APPOINTMENT_ERROR',
    FIND_BY_QUERY_ERROR: 'FIND_APPOINTMENT_BY_QUERY_ERROR',
    DUPLICATE_DOC_ERROR: 'DUPLICATE_APPOINTMENT_ERROR',
    REMOVE_DOC_ERROR: 'REMOVE_APPOINTMENT_DOC_ERROR'
};

export class AppointmentModel extends BaseModel {
    constructor() {
        super(AppointmentMongoModel, errorCodes);
    }
}
