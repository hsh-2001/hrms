import { useMemo } from "react";
import { useAppSelector } from "../store";
import EnumPermission from "../types/enums/enumPermission";

export default function usePermission(pageKey: string) {
  const permissions = useAppSelector((state) => state.user.user?.permissions);

  return useMemo(() => {
    const permission = permissions?.find((p) => p.page_key === pageKey);
    const action = permission?.action ?? 0;

    const hasPermission = (flag: number) => (action & flag) !== 0;

    return {
      isViewable: hasPermission(EnumPermission.VIEW),
      isCreateable: hasPermission(EnumPermission.CREATE),
      isEditable: hasPermission(EnumPermission.UPDATE),
      isDeletable: hasPermission(EnumPermission.DELETE),
      isExportable: hasPermission(EnumPermission.EXPORT),
    };
  }, [permissions, pageKey]);
}