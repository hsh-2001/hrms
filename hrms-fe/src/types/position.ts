export interface IPosition {
    id: number;
    title: string;
    code: string;
    description: string;
    is_active: boolean;
    company_id: number;
    department_id: number;
}

export type ICreatePositionRequest = Omit<IPosition, "id">;

export type IUpdatePositionRequest = Partial<Omit<IPosition, "id">>;

export interface IGetPositionsResponse extends IPosition {
    created_at: string;
    updated_at: string;
}