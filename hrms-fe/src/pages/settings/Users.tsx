import { useEffect, useRef } from "react";
import useUser from "../../hooks/useUser";
import BaseHeader from "../../components/shares/BaseHeader";
import useDevice from "../../hooks/useDevice";

const UsersPage = () => {
    const { users, fetchUsers } = useUser();
    const { isMobile } = useDevice();

    const isCalled = useRef(false);
    useEffect(() => {
        if (isCalled.current) return;
        fetchUsers();
        isCalled.current = true;
    }, []);

    return (
        <div className="w-full">
            <BaseHeader headerTitle="Users" />
            <div className={`${isMobile ? "overflow-x-auto px-2 max-w-screen" : ""}`}>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { users.length > 0 && users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default UsersPage;
