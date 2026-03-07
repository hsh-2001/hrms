export interface IPagination {
    total_page?: number;
    limit: number;
    page: number;
}

export interface IOrderBy {
    order_by: string;
    order_direction: "ASC" | "DESC";
}