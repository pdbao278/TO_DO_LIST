"use server";
import { cookies } from "next/headers";
import type { SetRoleToken, CreateToken  } from "@/types/tokens";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Change user role
export const setRoleToken = async ( formData: SetRoleToken) => {

  const response = await fetch(`${API_URL}/tokens/set-role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to change role");
  }
  
  return await response.json();
};


export const getTokenInfo = async () => {
  const response = await fetch(`${API_URL}/tokens/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch token info");
  }

  const data = await response.json();
  return data.data;
}


export const refreshToken = async () => {
  const response = await fetch(`${API_URL}/tokens/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }
  const data = await response.json();
  return data.data;
}

export const createToken = async (formData:CreateToken) => {
  const response = await fetch(`${API_URL}/tokens/create`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData)
  });
  if (!response.ok) {
    throw new Error("Failed to create token");
  }
    
  return await response.json();

}