export interface IRoute {
    title: string;
    path: string;
    isExpanded?: boolean;
    page_key?: string;
    component?: React.ComponentType<unknown>;
    children?: IRoute[];
}