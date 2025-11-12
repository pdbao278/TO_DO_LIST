"use server";

import globalConfig from "@/app.config";
import { cookies } from "next/headers";
import type { Users } from "@/types/users";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
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
