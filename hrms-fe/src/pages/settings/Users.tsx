import { useEffect } from "react";
import useUser from "../../hooks/useUser";

const UsersPage = () => {
    const { fetchUsers } = useUser();

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div>Users Page</div>
    )
}

export default UsersPage;
