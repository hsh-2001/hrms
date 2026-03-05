import { format } from "date-fns";


const dateFormat = (date: string | Date) => {
    return format(new Date(date), "dd MMMM yyyy");
}

const dateTimeFormat = (date: string | Date) => {
    return format(new Date(date), "dd MMMM yyyy, hh:mm:ss aa");
}

const timeFormat = (dateTime: string | Date) => {
    return format(new Date(dateTime), "hh:mm:ss aa");
}

export default {
    dateFormat,
    dateTimeFormat,
    timeFormat,
}