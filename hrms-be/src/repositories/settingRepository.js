import query from "../helpers/query.js";

const getCompanySettings = async (company_id) => {
    const sql = "SELECT * FROM get_company_settings($1)";
    const result = await query(sql, [company_id]);
    return result.rows[0];
}

const createOrUpdateCompanySettings = async (req, settings) => {
    const existingSettings = await getCompanySettings(req);
    if (existingSettings) {
        const sql = "UPDATE company_settings SET setting_key = $1, setting_value = $2 WHERE id = $3";
        await query(sql, [settings.setting_key, settings.setting_value, existingSettings.id]);
    } else {
        const sql = "INSERT INTO company_settings (setting_key, setting_value, company_id) VALUES ($1, $2, $3)";
        await query(sql, [settings.setting_key, settings.setting_value, req.user.company_id]);
    }
}

export default {
    getCompanySettings,
    createOrUpdateCompanySettings
}