import { format } from "date-fns";


const dateFormat = (date: string | Date) => {
    return format(new Date(date), "dd MMMM yyyy");
}

const dateTimeFormat = (date: string | Date) => {
    return format(new Date(date), "dd MMMM yyyy, HH:mm:ss");
}

const timeFormat = (dateTime: string | Date) => {
    return format(new Date(dateTime), "HH:mm:ss");
}

export default {
    dateFormat,
    dateTimeFormat,
    timeFormat,
}