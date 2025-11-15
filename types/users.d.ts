export interface Users {
  id: number;
  username: string;
  fullname: string;
  roleName: string;
}
export interface ParamsUser {
  id: string;
}
export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}