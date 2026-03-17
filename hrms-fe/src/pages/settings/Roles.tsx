import { useEffect, useState } from "react";
import useSettings from "../../hooks/useSettings";
import useCommon from "../../hooks/useCommon";
import BaseHeader from "../../components/shares/BaseHeader";
import EnumPermission from "../../types/enums/enumPermission";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import BaseDialog from "../../components/shares/BaseDialog";
import DangerButton from "../../components/shares/button/DangerButton";
import { Edit, Plus, Menu, X } from "lucide-react";
import type { ICreateRoleRequest } from "../../types/permission";
import MyInput from "../../components/shares/input/MyInput";
import Tag from "antd/es/tag";

const RolesPage = () => {
  const {
    rolesAndPermissions,
    getRolesAndPermissions,
    activeRole,
    setActiveRole,
    setPermissionModel,
    handleUpdateRolePermissions,
    permissionModel,
    isUpdatingPermissions,
    hasRoleChanges,
    setIsCreateRoleVisible,
    isCreateRoleVisible,
    roleModel,
    setRoleModel,
    onCreateRole,
    onCickEdit,
  } = useSettings();

  const { isMobile } = useCommon();

  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingRoleId, setPendingRoleId] = useState<number | null>(null);
  const [isRolesPanelOpen, setIsRolesPanelOpen] = useState(false);

  useEffect(() => {
    getRolesAndPermissions();
  }, [getRolesAndPermissions]);

  const handleRoleSwitch = (roleId: number) => {
    if (roleId === activeRole) return;

    if (hasRoleChanges(activeRole)) {
      setPendingRoleId(roleId);
      setShowUnsavedDialog(true);
    } else {
      setActiveRole(roleId);
    }
  };

  const handleDiscardChanges = () => {
    if (pendingRoleId !== null) {
      // Reset permission model to original data for the current role
      setPermissionModel(rolesAndPermissions);
      setActiveRole(pendingRoleId);
    }
    setShowUnsavedDialog(false);
    setPendingRoleId(null);
  };

  const handleSaveAndSwitch = async () => {
    const response = await handleUpdateRolePermissions(activeRole);
    if (response?.isSuccess && pendingRoleId !== null) {
      setActiveRole(pendingRoleId);
    }
    setShowUnsavedDialog(false);
    setPendingRoleId(null);
  };

  const handleCancelSwitch = () => {
    setShowUnsavedDialog(false);
    setPendingRoleId(null);
  };

  const handlePermissionChange = (
    page: string,
    action: number,
    isChecked: boolean,
  ) => {
    if (!permissionModel) return;

    const updatedPermissions = permissionModel.map((role) => {
      if (role.role_id === activeRole) {
        const updatedRolePermissions = role.permissions.map((permission) => {
          if (permission.page_key === page) {
            const currentAction = Number(permission.action) || 0;
            const newAction = isChecked
              ? currentAction | action
              : currentAction & ~action;
            return { ...permission, action: newAction };
          }
          return permission;
        });
        return { ...role, permissions: updatedRolePermissions };
      }
      return role;
    });

    setPermissionModel(updatedPermissions);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <CreateRoleDialog
        onSubmit={onCreateRole}
        isOpen={isCreateRoleVisible}
        onClose={() => {
          setIsCreateRoleVisible(false);
          setRoleModel({ role_id: undefined, name: "", description: "" });
        }}
        model={roleModel}
        setModel={setRoleModel}
        isEdit={!!roleModel.role_id}
      />
      <BaseHeader headerTitle="Roles & Permissions" />

      {isMobile && (
        <div className="p-2 sm:p-4 pb-0">
          <button
            onClick={() => setIsRolesPanelOpen(!isRolesPanelOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <Menu size={18} />
            <span>Roles</span>
          </button>
        </div>
      )}

      {isMobile && isRolesPanelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsRolesPanelOpen(false)}
        />
      )}

      <div className="flex flex-col lg:flex-row flex-1 gap-4 p-2 sm:p-4 min-h-0 overflow-hidden">
        <div
          className={`
          ${isMobile ? "fixed top-0 bottom-20 left-0 z-50 w-72 rounded-r-lg shadow-lg" : "relative z-auto w-64 rounded-lg shadow-sm"}
          bg-white border border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobile ? (isRolesPanelOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          overflow-hidden
        `}
        >
          <div className="flex justify-between items-center bg-linear-to-r from-green-500 to-green-600 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">Roles</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreateRoleVisible(true);
                }}>
                <Plus
                  size={16}
                  className="text-green-50 hover:text-green-100 transition-colors"
                />
              </button>
              {isMobile && (
                <button onClick={() => setIsRolesPanelOpen(false)}>
                  <X
                    size={16}
                    className="text-green-50 hover:text-green-100 transition-colors"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {rolesAndPermissions?.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No roles available
              </div>
            ) : (
              rolesAndPermissions?.map((role) => (
                <div
                  key={role.role_id}
                  className={`flex justify-between w-full px-4 py-3 transition-colors cursor-pointer ${
                    role.role_id === activeRole
                      ? "bg-green-50 border-green-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    handleRoleSwitch(role.role_id);
                    setIsRolesPanelOpen(false);
                  }}
                >
                  <div className="grid">
                    <span
                      className={`text-sm font-medium ${
                        role.role_id === activeRole
                          ? "text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      {role.role_name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {role.description}
                    </span>
                  </div>
                  <div>
                    {role.is_default ? (
                      <Tag className="ml-2 text-xs">Default</Tag>
                    ) : (
                      <button
                        onClick={() => {
                          onCickEdit(role);
                        }}
                      >
                        <Edit size={14} className="text-gray-400 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 h-full min-h-0">
          {(() => {
            const selectedRole = (permissionModel || rolesAndPermissions)?.find(
              (role) => role.role_id === activeRole,
            );
            return selectedRole ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="bg-linear-to-r from-green-500 to-green-600 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {selectedRole.role_name} Permissions
                    </h2>
                    <p className="text-green-50 text-sm mt-1">
                      {selectedRole.permissions.length} permission modules
                    </p>
                  </div>
                  <PrimaryButton
                    name={isUpdatingPermissions ? "Saving..." : "Save Role"}
                    onClick={() => {
                      handleUpdateRolePermissions(selectedRole.role_id);
                    }}
                    disabled={isUpdatingPermissions}
                  />
                </div>
                <div className="overflow-y-auto flex-1 p-3 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {selectedRole.permissions.map((permission, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">
                            {permission.page}
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                          {Object.entries(EnumPermission).map(
                            ([key, value]) => {
                              if (typeof value === "number") {
                                const hasPermission =
                                  ((Number(permission.action) || 0) & value) !==
                                  0;
                                const available =
                                  (permission.available & value) !== 0;
                                return (
                                  <label
                                    key={key}
                                    className={`flex items-center gap-2 ${!available ? "cursor-not-allowed" : "cursor-pointer"} group`}
                                  >
                                    <input
                                      type="checkbox"
                                      className={`w-4 h-4 text-green-600 rounded ${!available ? "cursor-not-allowed" : "cursor-pointer"}`}
                                      value={value.toString()}
                                      disabled={!available}
                                      onChange={(e) => {
                                        handlePermissionChange(
                                          permission.page_key,
                                          value,
                                          e.target.checked,
                                        );
                                      }}
                                      checked={!!hasPermission}
                                    />
                                    <span
                                      className={`text-sm transition-colors ${!available ? "text-gray-400" : "text-gray-700 group-hover:text-green-600"}`}
                                    >
                                      {key}
                                    </span>
                                  </label>
                                );
                              }
                              return null;
                            },
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 text-4xl">👆</div>
                  <p className="text-gray-500 font-medium">
                    Select a role to manage permissions
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <BaseDialog
        isOpen={showUnsavedDialog}
        onClose={handleCancelSwitch}
        title="Unsaved Changes"
        isCentered={true}
      >
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <p className="text-gray-700 text-center text-sm sm:text-base">
            You have unsaved changes for the current role. What would you like
            to do?
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <DangerButton name="Discard" onClick={handleDiscardChanges} />
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-[20px] text-sm hover:bg-gray-300"
              onClick={handleCancelSwitch}
            >
              Cancel
            </button>
            <PrimaryButton name="Save & Switch" onClick={handleSaveAndSwitch} />
          </div>
        </div>
      </BaseDialog>
    </div>
  );
};

export default RolesPage;

interface CreateRoleProps {
  isOpen: boolean;
  onClose: () => void;
  model: ICreateRoleRequest;
  setModel: React.Dispatch<React.SetStateAction<ICreateRoleRequest>>;
  onSubmit: () => void;
  isEdit?: boolean;
}

const CreateRoleDialog = ({
  isOpen,
  onClose,
  model,
  setModel,
  onSubmit,
  isEdit,
}: CreateRoleProps) => {
  if (!isOpen) return null;

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Role" : "Create New Role"}
      isCentered={true}
    >
      <div className="w-full sm:w-100">
        <form action="#" className="grid gap-2 sm:gap-3">
          <MyInput
            id="name"
            value={model.name}
            onChange={(e) =>
              setModel((prev) => ({ ...prev, name: e.target.value }))
            }
            label="Role Name"
          />
          <MyInput
            id="description"
            value={model.description}
            onChange={(e) =>
              setModel((prev) => ({ ...prev, description: e.target.value }))
            }
            label="Role Description"
          />
          <div className="flex justify-end">
            <PrimaryButton
              name={isEdit ? "Save Changes" : "Create Role"}
              type="submit"
              onClick={() => {
                onSubmit();
              }}
            />
          </div>
        </form>
      </div>
    </BaseDialog>
  );
};
