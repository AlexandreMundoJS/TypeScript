export interface IApiClient {
    show(user: any): Promise<any>;
    showAll(): any
    add(data: any, req: any, res: any, endpoint: string): Promise<any>;
    update(data: any, req: any, res: any, endpoint: string): Promise<void>
}