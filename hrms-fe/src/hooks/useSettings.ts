import { useCallback, useState } from "react";
import { type IUpdateCompanySetting, type IGetCompanySettingResponse, GetCompanyOverviewResponse } from "../types/settings";
import settingApi from "../lib/settingApi";
import type { IGetRolesAndPermissionsResponse, IUpdatePermissionRequest, IUpdatePermissionRRequestByRole } from "../types/permission";

export default function useSettings() {
    const [companySetting, setCompanySetting] = useState<IGetCompanySettingResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [companyOverview, setCompanyOverview] = useState<GetCompanyOverviewResponse>(new GetCompanyOverviewResponse(0, 0, 0));
    const [rolesAndPermissions, setRolesAndPermissions] = useState<IGetRolesAndPermissionsResponse[]>([]);
    const [activeRole, setActiveRole] = useState<number>(0);
    const [permissionModel, setPermissionModel] = useState<IUpdatePermissionRequest[] | null>(null);
    const [isUpdatingPermissions, setIsUpdatingPermissions] = useState(false);
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
                setIsEditMode(false);
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

    const getCompanySettingOverview = async () => {
        try {
            const response = await settingApi.getCompanyOverview();
            if (response.isSuccess) {
                const data = new GetCompanyOverviewResponse(
                    response.data.total_employees,
                    response.data.total_departments,
                    response.data.total_positions,
                );
                setCompanyOverview(data);
            }
        } catch (error) {
            console.error("Error fetching company overview:", error);
        }
    }

    const getRolesAndPermissions = useCallback(async () => {
        try {
            const response = await settingApi.getRolesAndPermissions();
            if (response.isSuccess) {
                setRolesAndPermissions(response.data);
                setPermissionModel(response.data);
                setActiveRole(response.data.length > 0 ? response.data[0].role_id : 0);
            }
        } catch (error) {
            console.error("Error fetching roles and permissions:", error);
        }
    }, []);

    const hasRoleChanges = (roleId: number): boolean => {
        if (!permissionModel) return false;

        const originalRole = rolesAndPermissions.find((role) => role.role_id === roleId);
        const currentRole = permissionModel.find((role) => role.role_id === roleId);

        if (!originalRole || !currentRole) return false;

        const originalPermissionMap = new Map(
            originalRole.permissions.map((permission) => [permission.page_key, Number(permission.action) || 0]),
        );

        return currentRole.permissions.some((permission) => {
            const originalAction = originalPermissionMap.get(permission.page_key) ?? 0;
            const currentAction = Number(permission.action) || 0;
            return originalAction !== currentAction;
        });
    };

    const getChangedPermissionPayload = (
        originalData: IGetRolesAndPermissionsResponse[],
        currentData: IUpdatePermissionRequest[],
    ): IUpdatePermissionRequest[] => {
        const originalRoleMap = new Map(
            originalData.map((role) => [role.role_id, role]),
        );

        return currentData.reduce<IUpdatePermissionRequest[]>((acc, role) => {
            const originalRole = originalRoleMap.get(role.role_id);

            if (!originalRole) {
                acc.push(role);
                return acc;
            }

            const originalPermissionMap = new Map(
                originalRole.permissions.map((permission) => [permission.page_key, Number(permission.action) || 0]),
            );

            const changedPermissions = role.permissions.filter((permission) => {
                const originalAction = originalPermissionMap.get(permission.page_key) ?? 0;
                const currentAction = Number(permission.action) || 0;
                return originalAction !== currentAction;
            });

            if (changedPermissions.length > 0) {
                acc.push({
                    ...role,
                    permissions: changedPermissions,
                });
            }

            return acc;
        }, []);
    };

    const handleUpdateRolePermissions = async (roleId?: number) => {
        if (!permissionModel) return;
        const changedPayload = getChangedPermissionPayload(rolesAndPermissions, permissionModel);
        const targetPayload = typeof roleId === "number"
            ? changedPayload.filter((role) => role.role_id === roleId)
            : changedPayload;

        if (targetPayload.length === 0) return;

        setIsUpdatingPermissions(true);
        try {
            const finnalRequest: IUpdatePermissionRRequestByRole = {
                role_id: targetPayload[0].role_id,
                page_ids: targetPayload[0].permissions.map((permission) => Number(permission.page_id) || 0),
                actions: targetPayload[0].permissions.map((permission) => Number(permission.action) || 0),
            }
            const response = await settingApi.updateRolesAndPermissions(finnalRequest);
            if (response.isSuccess) {
                await getRolesAndPermissions();
            } else {
                console.error(response.message || "Failed to update permissions");
            }
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error updating role permissions";
            console.error("Error updating role permissions:", errorMessage);
        } finally {
            setIsUpdatingPermissions(false);
        }
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
        companyOverview,
        getCompanySettingOverview,
        rolesAndPermissions,
        getRolesAndPermissions,
        activeRole,
        setActiveRole,
        permissionModel,
        setPermissionModel,
        handleUpdateRolePermissions,
        isUpdatingPermissions,
        hasRoleChanges,
    };
}
