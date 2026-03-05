import { useEffect, useState } from "react";
import useSettings from "../../hooks/useSettings";
import BaseHeader from "../../components/shares/BaseHeader";
import EnumPermission from "../../types/enums/enumPermission";
import PrimaryButton from "../../components/shares/button/PrimaryButton";
import BaseDialog from "../../components/shares/BaseDialog";
import DangerButton from "../../components/shares/button/DangerButton";

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
  } = useSettings();

  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingRoleId, setPendingRoleId] = useState<number | null>(null);

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
      <BaseHeader headerTitle="Roles & Permissions" />
      <div className="flex flex-1 gap-4 p-4">
        <div className="w-64 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden max-h-[80vh]">
          <div className="bg-linear-to-r from-green-500 to-green-600 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">Roles</h3>
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
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    role.role_id === activeRole
                      ? "bg-green-50 border-green-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleRoleSwitch(role.role_id)}
                >
                  <span className={`text-sm font-medium ${
                    role.role_id === activeRole 
                      ? "text-green-700" 
                      : "text-gray-700"
                  }`}>
                    {role.role_name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 max-h-[80vh]">
          {(() => {
            const selectedRole = (permissionModel || rolesAndPermissions)?.find(
              (role) => role.role_id === activeRole,
            );
            return selectedRole ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="bg-linear-to-r from-green-500 to-green-600 px-6 py-4 flex items-start justify-between gap-4">
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
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-4">
                    {selectedRole.permissions.map((permission, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">
                            {permission.page}
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {Object.entries(EnumPermission).map(
                            ([key, value]) => {
                              if (typeof value === "number") {
                                const hasPermission = ((Number(permission.action) || 0) & value) !== 0;
                                return (
                                  <label
                                    key={key}
                                    className="flex items-center gap-2 cursor-pointer group"
                                  >
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 text-green-600 rounded cursor-pointer"
                                      value={value.toString()}
                                      onChange={(e) => {
                                        handlePermissionChange(
                                          permission.page_key,
                                          value,
                                          e.target.checked,
                                        );
                                      }}
                                      checked={!!hasPermission}
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">
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
                  <p className="text-gray-500 font-medium">Select a role to manage permissions</p>
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
        <div className="p-4 space-y-4">
          <p className="text-gray-700 text-center">
            You have unsaved changes for the current role. What would you like to do?
          </p>
          <div className="flex gap-3 justify-center">
            <DangerButton
              name="Discard"
              onClick={handleDiscardChanges}
            />
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-[20px] text-sm hover:bg-gray-300"
              onClick={handleCancelSwitch}
            >
              Cancel
            </button>
            <PrimaryButton
              name="Save & Switch"
              onClick={handleSaveAndSwitch}
            />
          </div>
        </div>
      </BaseDialog>
    </div>
  );
};

export default RolesPage;
