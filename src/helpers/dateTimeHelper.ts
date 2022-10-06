import { format } from "date-fns";

export const formatToClosestThirtyMinutes = (date: Date) => {
    const coeff = 1000 * 60 * 30;
    return new Date(Math.floor(date.getTime() / coeff) * coeff);
};

export const getFormattedDate = (date: Date) => {
    return format(date, 'do MMM y');
};

export const getFormattedTime = (date: Date) => {
    return format(date, 'hh:mm a');
};