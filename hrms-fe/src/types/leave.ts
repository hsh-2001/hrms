import dateTimeFormat from "../lib/dateTimeFormat";

export interface ILeave {
    id: number;
    employee_id: number;
    leave_type_id: string;
    leave_type_name: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
}

export interface ILeaveType {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ICreateLeaveRequest {
    employee_id: string;
    leave_type_id: string;
    start_date: string;
    end_date: string;
    reason: string;
}

export class GetLeaveRequestResponse implements ILeave {
    id: number;
    employee_id: number;
    leave_type_id: string;
    leave_type_name: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;

    constructor(init: ILeave) {
        this.id = init.id;
        this.employee_id = init.employee_id;
        this.start_date = init.start_date;
        this.leave_type_id = init.leave_type_id;
        this.leave_type_name = init.leave_type_name;
        this.end_date = init.end_date;
        this.reason = init.reason;
        this.status = init.status;
    }

    get startDateForDisplay(): string {
        return dateTimeFormat.dateFormat(this.start_date) || "N/A";
    }

    get endDateForDisplay(): string {
        return dateTimeFormat.dateFormat(this.end_date) || "N/A";
    }
}