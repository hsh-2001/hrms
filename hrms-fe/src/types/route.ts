export interface IRoute {
    title: string;
    path: string;
    isExpanded?: boolean;
    component?: React.ComponentType<unknown>;
    children?: IRoute[];
}