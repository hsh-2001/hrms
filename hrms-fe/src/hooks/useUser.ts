import { useState } from "react";
import { getAllUsers } from "../lib/userApi";

export default function useUser() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    return {
        users,
        fetchUsers
    };
}