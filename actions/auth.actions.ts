"use server";

import globalConfig from "@/app.config";
import {
  IInfoToken,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from "@/types/auth";
import { IBaseResponse, IShowResponse } from "@/types/global";
import { cookies } from "next/headers";

export const login = async (formData: ILoginRequest) => {
  const response = await fetch(`${globalConfig.baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (response.ok) {
    const result = data.data as ILoginResponse;
    if (result != null) {
      (await cookies()).set("accessToken", result.accessToken);
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    ...data,
  } as IShowResponse<ILoginResponse>;
};

export const register = async (formData: IRegisterRequest) => {
  const response = await fetch(`${globalConfig.baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    ...data,
  } as IBaseResponse;
};

export const logout = async () => {
  const response = await fetch(`${globalConfig.baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    (await cookies()).delete("accessToken");
  }

  return {
    ok: response.ok,
    status: response.status,
    ...data,
  } as IBaseResponse;
};

export const getInfoToken = async () => {
  const response = await fetch(`${globalConfig.baseUrl}/tokens/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data: data.data as IInfoToken,
  } as IShowResponse<IInfoToken>;
};
