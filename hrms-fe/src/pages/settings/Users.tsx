import { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import BaseHeader from "../../components/shares/BaseHeader";
import useDevice from "../../hooks/useDevice";
import { Tag } from "antd";
import dateTimeFormat from "../../lib/dateTimeFormat";
import BaseDialog from "../../components/shares/BaseDialog";
import MySelection from "../../components/shares/select/MySelection";
import useSettings from "../../hooks/useSettings";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import { useAppSelector } from "../../store";
import {
  Edit,
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  User,
} from "lucide-react";
import Pagination from "../../components/Pagination";
import type { ICompanyUser } from "../../types/user";
import RightPopup from "../../components/shares/RightPopup";
import SortableHeader from "../../components/shares/SortHeader";
import usePermission from "../../hooks/usePermission";

const UsersPage = () => {
  const {
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
  } = useUser();
  const {
    isEditable,
  } = usePermission("settings/users");

  const [selectedUser, setSelectedUser] = useState<ICompanyUser | null>(null);

  const localUser = useAppSelector((state) => state.user);

  const { rolesAndPermissions, getRolesAndPermissions } = useSettings();

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
  }, [fetchUsers, getRolesAndPermissions]);

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
              <th>
                <SortableHeader
                  label="Username"
                  sortKey="username"
                  currentSort={sortOrder}
                  activedSortKey={activeSortKey}
                  onSort={(key, order) => {
                    setActiveSortKey(key);
                    onChangeSort(key, order);
                  }}
                  setSortOrder={setSortOrder}
                />
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th>
                <SortableHeader
                  label="Role"
                  sortKey="role_name"
                  currentSort={sortOrder}
                  activedSortKey={activeSortKey}
                  onSort={(key, order) => {
                    setActiveSortKey(key);
                    onChangeSort(key, order);
                  }}
                  setSortOrder={setSortOrder}
                />
              </th>
              <th>Status</th>
              <th>
                <SortableHeader
                  label="Created At"
                  sortKey="created_at"
                  currentSort={sortOrder}
                  activedSortKey={activeSortKey}
                  onSort={(key, order) => {
                    setActiveSortKey(key);
                    onChangeSort(key, order);
                  }}
                  setSortOrder={setSortOrder}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => (
                <tr
                  key={user.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedUser(user)}
                >
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        if(!isEditable) return;
                        e.stopPropagation();
                        setEditRoleModel({
                          user_id: user.id,
                          role_id: user.role_id ?? 0,
                        });
                        setIsEditRoleOpen(() =>
                          user.id === localUser.user?.id ? false : true,
                        );
                      }}
                    >
                      <Tag color={colorsMap[user.role]}>{user.role}</Tag>
                    </button>
                  </td>
                  <td>
                    <Tag color={user.is_active ? "green" : "red"}>
                      {user.is_active ? "Active" : "Inactive"}
                    </Tag>
                  </td>
                  <td>{dateTimeFormat.dateTimeFormat(user.created_at)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <Pagination
            total_page={users[0]?.total_page}
            page={users[0]?.page}
            onPageChange={onChangePage}
          />
        </div>
      </div>
      <EditUserRole
        isOpen={isEditRoleOpen}
        onClose={() => setIsEditRoleOpen(false)}
        model={editRoleModel}
        setModel={setEditRoleModel}
        roleOptions={roleOptions}
        onUpdate={onUpdateUserRole}
      />
      {selectedUser && (
        <RightPopup
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        >
          <div
            className="bg-white w-full md:w-1/2 lg:w-1/3 h-full shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                User Details
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col items-center py-6 border-b">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-white text-2xl font-bold">
                  {selectedUser.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedUser.username}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Tag color={selectedUser.is_active ? "green" : "red"}>
                  {selectedUser.is_active ? "Active" : "Inactive"}
                </Tag>
                <Tag
                  color={selectedUser.role === "Company" ? "blue" : "yellow"}
                >
                  {selectedUser.role}
                </Tag>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <Phone size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Building size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.company_name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Shield size={18} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedUser.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-200 rounded-full">
                  <User size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">User ID</p>
                  <p className="text-sm font-medium text-gray-800">
                    #{selectedUser.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Calendar size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created At</p>
                  <p className="text-sm font-medium text-gray-800">
                    {dateTimeFormat.dateTimeFormat(selectedUser.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Calendar size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Updated At</p>
                  <p className="text-sm font-medium text-gray-800">
                    {dateTimeFormat.dateTimeFormat(selectedUser.updated_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              {isEditable && (
                <button
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    setEditRoleModel({
                      user_id: selectedUser.id,
                      role_id: selectedUser.role_id ?? 0,
                  });
                  if (selectedUser.id !== localUser.user?.id) {
                    setIsEditRoleOpen(true);
                  }
                }}
              >
                <Edit size={16} />
                Edit User Role
              </button>
              )}
            </div>
          </div>
        </RightPopup>
      )}
    </div>
  );
};

export default UsersPage;

interface IEditUserRoleProps {
  isOpen: boolean;
  onClose: () => void;
  model: { user_id: number; role_id: number };
  setModel: React.Dispatch<
    React.SetStateAction<{ user_id: number; role_id: number }>
  >;
  roleOptions: { label: string; value: number }[];
  onUpdate: () => void;
}
const EditUserRole = ({
  isOpen,
  onClose,
  model,
  setModel,
  roleOptions,
  onUpdate,
}: IEditUserRoleProps) => {
  return (
    <BaseDialog
      title="Edit User Role"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <div className="w-100 space-y-4">
        <form action="#">
          <MySelection
            id="role_id"
            label="User Role"
            value={model.role_id}
            onChange={(e) => {
              setModel({ ...model, role_id: Number(e.target.value) });
            }}
            options={roleOptions}
          />
          <div className="flex justify-end gap-2 mt-2">
            <PrimaryButton
              name="Update"
              onClick={() => {
                onUpdate();
              }}
            />
          </div>
        </form>
      </div>
    </BaseDialog>
  );
};
