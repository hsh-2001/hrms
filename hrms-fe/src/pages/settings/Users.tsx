import { useEffect, useRef } from "react";
import useUser from "../../hooks/useUser";
import BaseHeader from "../../components/shares/BaseHeader";
import useDevice from "../../hooks/useDevice";
import { Tag } from "antd";
import dateTimeFormat from "../../lib/dateTimeFormat";
// import { Edit } from "lucide-react";
import BaseDialog from "../../components/shares/BaseDialog";
import MySelection from "../../components/shares/select/MySelection";
import useSettings from "../../hooks/useSettings";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import { useAppSelector } from "../../store";

const UsersPage = () => {
  const {
    users,
    fetchUsers,
    isEditRoleOpen,
    setIsEditRoleOpen,
    editRoleModel,
    setEditRoleModel,
    onUpdateUserRole,
   } = useUser();

   const localUser = useAppSelector((state) => state.user);

   const {
    rolesAndPermissions,
    getRolesAndPermissions,
   } = useSettings();

  const { isMobile } = useDevice();

  const isCalled = useRef(false);

  const roleOptions = rolesAndPermissions.map((role) => ({
    label: role.role_name,
    value: role.role_id,
  }));
  useEffect(() => {
    const fetchData = async () => {
      if (isCalled.current) return;
      fetchUsers();
      await getRolesAndPermissions();
      isCalled.current = true;
    };
    fetchData();
  }, []);

  const colorsMap: Record<string, string> = {
    Company: "blue",
    Employee: "yellow",
  };

  return (
    <div className="w-full">
      <BaseHeader headerTitle="Users" />
      <div
        className={`px-2 ${isMobile ? "overflow-x-auto px-2 max-w-screen" : ""}`}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th align="right">Created At</th>
              <th align="right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => {
                      setEditRoleModel({ user_id: user.id, role_id: user.role_id ?? 0 });
                      setIsEditRoleOpen(() => user.id === localUser.user?.id ? false : true);
                    }}>
                      <Tag color={colorsMap[user.role]}>{user.role}</Tag>
                    </button>
                  </td>
                  <td align="right">
                    {dateTimeFormat.dateTimeFormat(user.created_at)}
                  </td>
                  <td>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <EditUserRole
        isOpen={isEditRoleOpen}
        onClose={() => setIsEditRoleOpen(false)}
        model={editRoleModel}
        setModel={setEditRoleModel}
        roleOptions={roleOptions}
        onUpdate={onUpdateUserRole}
      />
    </div>
  );
};

export default UsersPage;

interface IEditUserRoleProps {
  isOpen: boolean;
  onClose: () => void;
  model: { user_id: number; role_id: number };
  setModel: React.Dispatch<React.SetStateAction<{ user_id: number; role_id: number }>>;
  roleOptions: { label: string; value: number }[];
  onUpdate: () => void;
}
const EditUserRole = ({ isOpen, onClose, model, setModel, roleOptions, onUpdate }: IEditUserRoleProps) => {
  return (
    <BaseDialog title="Edit User Role" isOpen={isOpen} onClose={onClose} isCentered>
      <div className="w-100 space-y-4">
        <form action="#">
          <MySelection
            id="role_id"
            label="User Role"
            value={model.role_id}
            onChange={(e) => { setModel({ ...model, role_id: Number(e.target.value) }) }}
            options={roleOptions}
          />
          <div className="flex justify-end gap-2 mt-2">
            <PrimaryButton
              name="Update"
              onClick={() => { onUpdate(); }}
            />
          </div>
        </form>
      </div>
    </BaseDialog>
  );
};
