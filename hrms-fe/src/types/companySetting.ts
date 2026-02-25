export default interface ICompanySetting {
    id: number;
    currency_code: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    fiscal_year_start_month: number;
    timezone: string;
    working_days_per_week: number;
    allow_overtime: boolean;
    overtime_rate: number;
    probation_period_days: number;
}

export interface IWorkingShift {
    id: number;
    shift_name: string;
    start_time: string;
    end_time: string;
    break_start: string;
    break_end: string;
}