export interface ISetRoleToken {
    id: Number;
    roleName: string;
}
export interface IInfoToken {
    sub: string;
    username: string;
    role: string;
    devices: string;
    expiresAt: string;
}
export interface ICreateToken {
    id: Number;
    deviceId: string;
}