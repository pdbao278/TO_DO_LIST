export interface SetRoleToken {
    id: Number;
    roleName: string;
}
export interface InfoToken {
    sub: string;
    username: string;
    role: string;
    devices: string;
    expiresAt: string;
}
export interface CreateToken {
    id: Number;
    deviceId: string;
}