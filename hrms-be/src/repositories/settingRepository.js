import query from "../helpers/query.js";

const getCompanySettings = async (req) => {
    const { company_id } = req.user;
    const sql = "SELECT * FROM company_settings WHERE company_id = ?";
    const result = await query(sql, [company_id]);
    return result[0];
}

const createOrUpdateCompanySettings = async (req, settings) => {
    const existingSettings = await getCompanySettings(req);
    if (existingSettings) {
        const sql = "UPDATE company_settings SET setting_key = ?, setting_value = ? WHERE id = ?";
        await query(sql, [settings.setting_key, settings.setting_value, existingSettings.id]);
    } else {
        const sql = "INSERT INTO company_settings (setting_key, setting_value, company_id) VALUES (?, ?, ?)";
        await query(sql, [settings.setting_key, settings.setting_value, req.user.company_id]);
    }
}

export default {
    getCompanySettings,
    createOrUpdateCompanySettings
}