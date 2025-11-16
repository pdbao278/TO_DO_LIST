"use server";
import { cookies } from "next/headers";
import type { Roles } from "@/types/roles";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
import type { NewRole } from "@/types/roles";


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
export const createRole = async (formData: NewRole) => {
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