"use server";
import { cookies } from "next/headers";
import type { Users } from "@/types/users";
import type { ChangePassword ,ChangePasswordAdmin } from "@/types/users";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Get all users
export const getAllUsers = async (): Promise<Users[]> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.data as Users[];
};

// Get user by ID
export const getUserByID = async (id: string): Promise<Users> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID: ${id}`);
  }

  const data = await response.json();
  return data.data as Users;
};

// Update user fullname
export const updateUser = async (id: string, fullname: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify({ fullname }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
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

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return await response.json();
};

// Change user password
export const changeUserPassword = async (id: string, formData: ChangePassword) => {

  const response = await fetch(`${API_URL}/users/${id}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    // gửi trực tiếp object (không bọc trong { formData })
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }

  return await response.json();
};

export const changePasswordAdmin = async (id: string,formData: ChangePasswordAdmin) => {
   const response = await fetch(`${API_URL}/users/${id}/change-password-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    // gửi trực tiếp object (không bọc trong { formData })
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to change password admin");
  }

  return await response.json();
};