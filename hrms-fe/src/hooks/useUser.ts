import { useState } from "react";
import { getAllUsers } from "../lib/userApi";
import type { ICompanyUser } from "../types/user";
import settingApi from "../lib/settingApi";
import type { IOrderBy, IPagination } from "../types/base";

export default function useUser() {
    const [users, setUsers] = useState<ICompanyUser[]>([]);
    const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
    const [activeSortKey, setActiveSortKey] = useState<string>("created_at");
    const [editRoleModel, setEditRoleModel] = useState({
      user_id: 0,
      role_id: 0,
    });

    const fetchUsers = async (param?: IPagination & IOrderBy ) => {
        const data = await getAllUsers(param || { page: 1, limit: 10, order_by: activeSortKey, order_direction: sortOrder });
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
        fetchUsers({ page, limit: 10, order_by: activeSortKey, order_direction: sortOrder });
    }

    const onChangeSort = (order_by: string, order_direction: "ASC" | "DESC") => {
        fetchUsers({ page: 1, limit: 10, order_by, order_direction });
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
        onChangeSort,
        sortOrder,
        setSortOrder,
        activeSortKey,
        setActiveSortKey,
    };
}