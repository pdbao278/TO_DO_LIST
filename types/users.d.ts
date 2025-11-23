export interface IUsers {
  id: number;
  username: string;
  fullname: string;
  roleName: string;
}
export interface IParamsUser {
  id: string;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IChangePasswordAdmin {
  newPassword: string;
}
export interface IUpdateUser{
  fullname:string;

}