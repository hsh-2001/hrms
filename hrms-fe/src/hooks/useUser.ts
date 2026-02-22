import { useState } from "react";
import { getAllUsers } from "../lib/userApi";
import type { ICompanyUser } from "../types/user";

export default function useUser() {
    const [users, setUsers] = useState<ICompanyUser[]>([]);

    const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data.data);
    };

    return {
        users,
        fetchUsers
    };
}