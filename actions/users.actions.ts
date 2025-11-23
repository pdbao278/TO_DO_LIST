"use server";
import { cookies } from "next/headers";
import type { IUsers } from "@/types/users";
import type { IChangePassword ,IChangePasswordAdmin ,IUpdateUser} from "@/types/users";
import { IBaseResponse, IIndexResponse, IShowResponse ,IResponse} from "@/types/global";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Get all users
export const getAllUsers = async (): Promise<IIndexResponse<IUsers>> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  const data = await response.json();
  return {
    ok: response.ok,
    message:data.message,
    statusCode: response.status,
    data: data.data as IUsers[],
  } as IIndexResponse<IUsers>;
};

// Get user by ID
export const getUserByID = async (id: string): Promise<IShowResponse<IUsers>> => {
  const token = (await cookies()).get("accessToken")?.value;

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
    data: data.data as IUsers,
  } as IShowResponse<IUsers>;
};


// Update user fullname
export const updateUser = async (id: string, formData:IUpdateUser) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData ),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
    data: data.data as IUpdateUser,
  }as IShowResponse<IUpdateUser>;
};

// Delete user
export const deleteUser = async (id: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  const data = await response.json();

  return {
    ok: response.ok,
    message:data.message,
    statusCode: response.status,
  } as IBaseResponse;
  
};

// Change user password
export const changeUserPassword = async (id: string, formData: IChangePassword) => {

  const response = await fetch(`${API_URL}/users/${id}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData),
  });
  
  const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
    data: data.data as IChangePassword,
  }as IShowResponse<IChangePassword>;

};

export const changePasswordAdmin = async (id: string,formData: IChangePasswordAdmin) => {
   const response = await fetch(`${API_URL}/users/${id}/change-password-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
    data: data.data as IChangePasswordAdmin,
  }as IShowResponse<IChangePasswordAdmin>;
  
};