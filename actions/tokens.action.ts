"use server";
import { cookies } from "next/headers";
import type { ISetRoleToken, ICreateToken  } from "@/types/tokens";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
import { IBaseResponse, IIndexResponse, IShowResponse ,IResponse} from "@/types/global";
import { IInfoToken } from "@/types/tokens";
// Change user role
export const setRoleToken = async ( formData: ISetRoleToken) => {

  const response = await fetch(`${API_URL}/tokens/set-role`, {
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


export const getTokenInfo = async () => {
  const response = await fetch(`${API_URL}/tokens/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  const data = await response.json();
return {
  ok: response.ok,
  statusCode: response.status,
  message: data.message,
  data: data.data as IInfoToken
} as IShowResponse<IInfoToken>;

}


export const refreshToken = async () => {
  const response = await fetch(`${API_URL}/tokens/refresh`, {
    method: "POST",
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

export const createToken = async (formData:ICreateToken) => {
  const response = await fetch(`${API_URL}/tokens/create`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
    body: JSON.stringify(formData)
  });
    const data = await response.json();

  return {
    ok: response.ok,
    statusCode: response.status,
    message:data.message,
  } as IBaseResponse;

}