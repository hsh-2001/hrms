import query from "../helpers/query.js";

const createNewCompany = async (company) => {
    const {
        name, email, phone, address,
        currencyCode, fiscalYearStartMonth, timezone,
        workingDaysPerWeek,
        allowOvertime, overtimeRate, probationPeriodDays
    } = company;

    // Set default values for empty strings
    const validatedData = {
        currencyCode: currencyCode || 'USD',
        fiscalYearStartMonth: fiscalYearStartMonth || 1,
        timezone: timezone || 'Asia/Phnom_Penh',
        workingDaysPerWeek: workingDaysPerWeek || 5,
        allowOvertime: allowOvertime !== undefined ? allowOvertime : false,
        overtimeRate: overtimeRate || 1.5,
        probationPeriodDays: probationPeriodDays || 30
    };

    const sql = 'SELECT company_id FROM create_company($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const params = [
        name, email, phone, address,
        validatedData.currencyCode, validatedData.fiscalYearStartMonth, validatedData.timezone,
        validatedData.workingDaysPerWeek,
        validatedData.allowOvertime, validatedData.overtimeRate, validatedData.probationPeriodDays
    ];
    const result = await query(sql, params);
    return result.rows[0];
}

const getAllCompanies = async () => {
    const sql = 'SELECT * FROM get_all_companies()';
    const result = await query(sql);
    return result.rows;
}

const updateCompany = async(companyId, company) => {
    const { name, address, phone, email } = company;
    const sql = 'UPDATE companies SET name = $1, address = $2, phone = $3, email = $4 WHERE id = $5 RETURNING *';
    const params = [name, address, phone, email, companyId];
    const result = await query(sql, params);
    return result.rows[0];
}

const deleteCompany = async (companyId) => {
    const sql = 'DELETE FROM companies WHERE id = $1';
    const params = [companyId];
    await query(sql, params);
}

export default {
    createNewCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
}