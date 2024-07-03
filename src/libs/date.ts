import { BASIC_CONFIGURATION } from 'src/config';
import { IAvailableSlots, TDays } from 'src/services/types';

export const isOperationalDay = (date: Date): boolean => {
    const shortDay: TDays = <TDays>date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const operation = BASIC_CONFIGURATION.operational[shortDay];
    return operation.length > 0;
};

export const isDateValid = (date: Date): boolean => {
    const getDate = date.getDate();
    return !Number.isNaN(getDate);
};

export const dateToDateString = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
        2,
        '0'
    )}`;
};

export const generateAppointmentSlots = (selectedDate: Date): IAvailableSlots[] | [] => {
    const newSelectedDate = dateToDateString(selectedDate);
    const shortDay: TDays = <TDays>selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(); // eg. MON

    const operation = BASIC_CONFIGURATION.operational[shortDay];

    const availableTime = [];
    for (let i = 0; i < operation.length; i++) {
        const operationTime = operation[i];
        const start = operationTime.start.split(':');
        const end = operationTime.end.split(':');
        const startMinutes = 60 - Number(start[1]);
        const endMinutes = Number(end[1]);

        const totalSlotsInMinutes = (Number(end[0]) - Number(start[0])) * 60 + startMinutes + endMinutes - 60;

        const countOfSlots = Math.trunc(totalSlotsInMinutes / Number(BASIC_CONFIGURATION.slotDuration));

        const slotStartDate = new Date(`${newSelectedDate} ${operationTime.start}`);
        for (let j = 0; j < countOfSlots; j++) {
            const updatedDateTimeString = slotStartDate
                .toLocaleString('sv-SE', { timeZone: BASIC_CONFIGURATION.timeZone })
                .slice(0, 16)
                .replace('T', ' ')
                .split(' ');
            availableTime.push({
                date: updatedDateTimeString[0],
                time: updatedDateTimeString[1],
                available_slots: Number(BASIC_CONFIGURATION.numberOfSlots)
            });

            slotStartDate.setMinutes(slotStartDate.getMinutes() + 30);
        }
    }

    return availableTime;
};
