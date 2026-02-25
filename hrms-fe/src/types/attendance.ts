export interface IAttendance {
    id: number;
    employee_id: string;
    check_in_time: string | null;
    check_out_time: string | null;
    re_check_in_time: string | null;
    re_check_out_time: string | null;
    attendance_date: string;
    status: "present" | "checked_in" | "checked_out" | "on_leave" | string;
}

export type ICreateAttendanceRequest = Omit<IAttendance, "id">;

