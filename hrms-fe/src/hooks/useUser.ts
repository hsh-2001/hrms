import { useState } from "react";
import { getAllUsers } from "../lib/userApi";
import type { ICompanyUser } from "../types/user";
import settingApi from "../lib/settingApi";
import type { IPagination } from "../types/base";

export default function useUser() {
    const [users, setUsers] = useState<ICompanyUser[]>([]);
    const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
    const [editRoleModel, setEditRoleModel] = useState({
      user_id: 0,
      role_id: 0,
    });

    const fetchUsers = async (param?: IPagination ) => {
        const data = await getAllUsers(param || { page: 1, limit: 10 });
        setUsers(data.data);
    };

    const onUpdateUserRole = async () => {
     try {
        await settingApi.updateUserRole(editRoleModel.user_id, editRoleModel.role_id);
        await fetchUsers();
        setIsEditRoleOpen(false);
     } catch (error) {
        console.error("Failed to update user role:", error);
     }
    }

    const onChangePage = (page: number) => {
        fetchUsers({ page, limit: 10 });
    }

    return {
        users,
        fetchUsers,
        isEditRoleOpen,
        setIsEditRoleOpen,
        editRoleModel,
        setEditRoleModel,
        onUpdateUserRole,
        onChangePage,
    };
}