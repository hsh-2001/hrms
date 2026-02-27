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
  standard_work_hours_per_day: number | null;
}

export interface IWorkingShift {
  shift_name: string | null;
  start_time: string | null;
  end_time: string | null;
  break_start: string | null;
  break_end: string | null;
}

export type IUpdateCompanySetting = ICompanySetting & IWorkingShift;

export type IGetCompanySettingRequest = Pick<ICompanySetting, "id">;
export type IGetCompanySettingResponse = ICompanySetting &
  IWorkingShift & {
    login_name: string;
    created_at: string;
    updated_at: string;
  };


export interface ICompanyOverview {
  total_employees: number;
  total_departments: number;
  total_positions: number;
}

export class GetCompanyOverviewResponse implements ICompanyOverview {
  total_employees: number;
  total_departments: number;
  total_positions: number;

  constructor(
    total_employees: number,
    total_departments: number,
    total_positions: number,
  ) {
    this.total_employees = total_employees;
    this.total_departments = total_departments;
    this.total_positions = total_positions;
  }
}
