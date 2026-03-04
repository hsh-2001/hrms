export interface IGetRolesAndPermissionsResponse {
  role_id: number;
  role_name: string;
  permissions: IPermission[];
}

export interface IPermission {
  page: string;
  action: number;
  page_key: string;
  page_id?: number;
  available: number;
}


export interface IUpdatePermissionRequest {
  role_id: number;
  role_name: string;
  permissions: IPermission[];
}

export interface IUpdatePermissionRRequestByRole {
  role_id: number;
  page_ids: number[];
  actions: number[];
}