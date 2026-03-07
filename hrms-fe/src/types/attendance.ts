import dateTimeFormat from "../lib/dateTimeFormat";

export interface IAttendance {
    id: number;
    employee_id: string;
    check_in_time: string | null;
    check_out_time: string | null;
    re_check_in_time: string | null;
    re_check_out_time: string | null;
    attendance_date: string;
    total_work_hours?: number;
    status: "present" | "checked_in" | "checked_out" | "on_leave" | string;
}

export type ICreateAttendanceRequest = Omit<IAttendance, "id">;

export class GetAttendanceResponse implements IAttendance {
    id: number;
    employee_id: string
    check_in_time: string | null;
    check_out_time: string | null;
    re_check_in_time: string | null;
    re_check_out_time: string | null;
    attendance_date: string;
    total_work_hours?: number;
    status: "present" | "checked_in" | "checked_out" | "on_leave" | string;

    constructor(init: IAttendance) {
        this.id = init.id;
        this.employee_id = init.employee_id;
        this.check_in_time = init.check_in_time;
        this.check_out_time = init.check_out_time;
        this.re_check_in_time = init.re_check_in_time;
        this.re_check_out_time = init.re_check_out_time;
        this.attendance_date = init.attendance_date;
        this.total_work_hours = init.total_work_hours;
        this.status = init.status;
    }

    get attendanceDateForDisplay(): string {
        return dateTimeFormat.dateFormat(this.attendance_date) || "N/A";
    }
}

export interface IReClockInOutRequest {
    attendance_date: string;
    re_check_in_time: string | null;
    re_check_out_time: string | null;
    reason: string;
}