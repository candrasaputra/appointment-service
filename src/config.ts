/* eslint no-process-env: "off" */

// NOTE: All env vars from process.env are imported as STRINGS. It is important to keep this in mind and cast your env vars as needed.
import { IOperasional } from 'src/services/types';

export const SERVICE_NAME = process.env.SERVICE_NAME || 'appointment-service';
export const PORT = process.env.PORT || '8080';
export const MONGO_URI = process.env.MONGO_URI || 'mongo';

export const BASIC_CONFIGURATION: IOperasional = {
    slotDuration: process.env.SLOT_DURATION ? Number(process.env.SLOT_DURATION) : 30,
    numberOfSlots: process.env.NUMBER_OF_SLOTS ? Number(process.env.NUMBER_OF_SLOTS) : 1,
    operational: {
        SUN: process.env.OPERATIONAL_SUNDAY ? JSON.parse(process.env.OPERATIONAL_SUNDAY) : [],
        MON: process.env.OPERATIONAL_MONDAY ? JSON.parse(process.env.OPERATIONAL_MONDAY) : [],
        TUE: process.env.OPERATIONAL_TUESDAY ? JSON.parse(process.env.OPERATIONAL_TUESDAY) : [],
        WED: process.env.OPERATIONAL_WEDNESDAY ? JSON.parse(process.env.OPERATIONAL_WEDNESDAY) : [],
        THU: process.env.OPERATIONAL_THURSDAY ? JSON.parse(process.env.OPERATIONAL_THURSDAY) : [],
        FRI: process.env.OPERATIONAL_FRIDAY ? JSON.parse(process.env.OPERATIONAL_FRIDAY) : [],
        SAT: process.env.OPERATIONAL_SATURDAY ? JSON.parse(process.env.OPERATIONAL_SATURDAY) : []
    },
    timeZone: 'Asia/Jakarta',
    dayOff: process.env.DAY_OFF ? String(process.env.DAY_OFF) : '2023-07-04 2023-07-05'
};
