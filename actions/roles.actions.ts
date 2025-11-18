"use server";
import { cookies } from "next/headers";
import type { Roles } from "@/types/roles";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
import type { NewRoles } from "@/types/roles";
import type { UpdateRoles } from "@/types/roles";
import type {Users} from "@/types/users";
// Get All Roles
export const getAllRoles = async (): Promise<Roles[]> => {
  const response = await fetch(`${API_URL}/roles/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  const data = await response.json();
  return data.data as Roles[];
};
 // Create New Role
export const createRole = async (formData: NewRoles) => {
  const response = await fetch(`${API_URL}/roles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to create role");
  }
  return await response.json();
};

export const getRoleByID = async (roleId: string): Promise<Roles> => {
  const response = await fetch(`${API_URL}/roles/${roleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch role");
  } 
  const data = await response.json();
  return data.data as Roles;
};

// Update Role
export const updateRole = async (roleId: string, formData:UpdateRoles) => {
  const response = await fetch(`${API_URL}/roles/${roleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to update role");
  }
  return await response.json();
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
  if (!response.ok) {
    throw new Error("Failed to delete role");
  }
  return await response.json();
}


// Get Users by Role Name
export const getUsersByRoleName = async (roleName: string): Promise<Users[]> => {
  const response = await fetch(`${API_URL}/roles/search-user/${roleName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users by role name");
  }
  const data = await response.json();
  return data.data as Users[];
}