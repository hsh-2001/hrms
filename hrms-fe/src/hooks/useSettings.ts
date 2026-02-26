import { useState } from "react";
import type { IUpdateCompanySetting, IGetCompanySettingResponse } from "../types/settings";
import settingApi from "../lib/settingApi";

export default function useSettings() {
    const [companySetting, setCompanySetting] = useState<IGetCompanySettingResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [companySettingModel, setCompanySettingModel] = useState<IUpdateCompanySetting>({
        id: 0,
        currency_code: "",
        name: "",
        address: "",
        email: "",
        phone: "",
        fiscal_year_start_month: 1,
        timezone: "",
        working_days_per_week: 5,
        allow_overtime: false,
        overtime_rate: 0,
        probation_period_days: 0,
        standard_work_hours_per_day: null,
        shift_name: null,
        start_time: null,
        end_time: null,
        break_start: null,
        break_end: null,
    });

    const getCompanySettings = async () => {
        setIsLoading(true);
        try {
            const response = await settingApi.getCompanySettings();
            if (response.isSuccess) {
                const data = response.data as IGetCompanySettingResponse;
                setCompanySetting(data);
                setCompanySettingModel({
                    id: data.id,
                    currency_code: data.currency_code || "",
                    name: data.name || "",
                    address: data.address || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    fiscal_year_start_month: data.fiscal_year_start_month || 1,
                    timezone: data.timezone || "",
                    working_days_per_week: data.working_days_per_week || 5,
                    allow_overtime: data.allow_overtime || false,
                    overtime_rate: data.overtime_rate || 0,
                    probation_period_days: data.probation_period_days || 0,
                    standard_work_hours_per_day: data.standard_work_hours_per_day ?? null,
                    shift_name: data.shift_name || null,
                    start_time: data.start_time || null,
                    end_time: data.end_time || null,
                    break_start: data.break_start || null,
                    break_end: data.break_end || null,
                });
            }
        } catch (error) {
            console.error("Error fetching company settings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCompanySettings = async () => {
        try {
            const response = await settingApi.updateCompanySettings(companySettingModel);
            if (response.isSuccess) {
                await getCompanySettings();
            }
            return response;
        } catch (error) {
            console.error("Error updating company settings:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        setCompanySettingModel(prev => ({
            ...prev,
            [id]: type === "number" ? (value === "" ? null : Number(value)) : value,
        }));
    };

    const handleToggleChange = (field: string, value: boolean) => {
        setCompanySettingModel(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return {
        companySettingModel,
        setCompanySettingModel,
        getCompanySettings,
        updateCompanySettings,
        companySetting,
        isLoading,
        handleInputChange,
        handleToggleChange,
        setIsEditMode,
        isEditMode,
    };
}
