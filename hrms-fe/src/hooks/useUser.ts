import { useState } from "react";
import { getAllUsers } from "../lib/userApi";
import type { ICompanyUser } from "../types/user";
import settingApi from "../lib/settingApi";

export default function useUser() {
    const [users, setUsers] = useState<ICompanyUser[]>([]);
    const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
    const [editRoleModel, setEditRoleModel] = useState({
      user_id: 0,
      role_id: 0,
    });

    const fetchUsers = async () => {
        const data = await getAllUsers();
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

    return {
        users,
        fetchUsers,
        isEditRoleOpen,
        setIsEditRoleOpen,
        editRoleModel,
        setEditRoleModel,
        onUpdateUserRole,
    };
}