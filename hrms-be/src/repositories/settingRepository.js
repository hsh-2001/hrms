import query from "../helpers/query.js";

const getCompanySettings = async (company_id) => {
    const sql = "SELECT * FROM get_company_settings($1)";
    const result = await query(sql, [company_id]);
    return result.rows[0];
}

const updateCompanySetting = async (company_id, body) => {
    const {
        name, email, phone, currency_code, address,
        fiscal_year_start_month, timezone, working_days_per_week,
        allow_overtime, overtime_rate, probation_period_days,
        shift_name, start_time, end_time, break_start, break_end,
        standard_work_hours_per_day
    } = body;

    const sql = `SELECT * FROM update_company_setting($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`;
    const result = await query(sql, [
        company_id, name, email, phone, currency_code, address,
        fiscal_year_start_month, timezone, working_days_per_week,
        allow_overtime, overtime_rate, probation_period_days,
        shift_name, start_time, end_time, break_start, break_end,
        standard_work_hours_per_day
    ]);
    return result.rows[0];
}

export default {
    getCompanySettings,
    updateCompanySetting
}