"use server";
import { cookies } from "next/headers";
import type { IRoles } from "@/types/roles";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
import type { INewRoles } from "@/types/roles";
import type { IUpdateRoles } from "@/types/roles";
import type {IUsers} from "@/types/users";
import { IBaseResponse, IIndexResponse, IShowResponse ,IResponse} from "@/types/global";
// Get All Roles
export const getAllRoles = async (): Promise<IIndexResponse<IRoles>> => {
  const response = await fetch(`${API_URL}/roles/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });
  const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
    data: data.data as IRoles[],
  } as IIndexResponse<IRoles>;
  
};
 // Create New Role
export const createRole = async (formData: INewRoles) => {
  const response = await fetch(`${API_URL}/roles/`, {
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
  } as IBaseResponse;
};

export const getRoleByID = async (roleId: string): Promise<IShowResponse<IRoles>> => {
  const response = await fetch(`${API_URL}/roles/${roleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

    const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
    data: data.data as IRoles,
  } as IShowResponse<IRoles>;
};

// Update Role
export const updateRole = async (roleId: string, formData:IUpdateRoles) => {
  const response = await fetch(`${API_URL}/roles/${roleId}`, {
    method: "PATCH",
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
  } as IBaseResponse;
};
// Delete Role
export const deleteRole = async (roleId: string) => {
  const response = await fetch(`${API_URL}/roles/${roleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  }); 
    const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
  } as IBaseResponse;
}


// Get Users by Role Name
export const getUsersByRoleName = async (roleName: string): Promise<IIndexResponse<IUsers>> => {
  const response = await fetch(`${API_URL}/roles/search-user/${roleName}`, {
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
}