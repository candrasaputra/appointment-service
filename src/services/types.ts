export interface IAvailableSlots {
    date: string;
    time: string;
    available_slots?: number;
}

interface IOperasionalDate {
    start: string;
    end: string;
}

export interface IOperasional {
    slotDuration: number;
    numberOfSlots: number;
    operational: {
        SUN: IOperasionalDate[] | [];
        MON: IOperasionalDate[] | [];
        TUE: IOperasionalDate[] | [];
        WED: IOperasionalDate[] | [];
        THU: IOperasionalDate[] | [];
        FRI: IOperasionalDate[] | [];
        SAT: IOperasionalDate[] | [];
    };
    timeZone: string;
    dayOff: string;
}

export type TDays = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
