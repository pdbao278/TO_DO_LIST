import React from "react";
import Header from "@/components/layout/Header";
import ChangePasswordForm from "@/components/users/ChangePassword"; 
import type { ParamsUser } from "@/types/users";

export default async function UsersPage({ params }: { params: Promise<ParamsUser> | ParamsUser }) {
  const resolvedParams = (params as Promise<ParamsUser>).then ? await params : params as ParamsUser;

  return (
    <main>
      <Header />
      <h2 className="flex justify-center items-center text-amber-600 h-15 text-3xl">
        Đổi mật khẩu người dùng: 
      </h2>

      <ChangePasswordForm userId={resolvedParams.id} />
    </main>
  );
}
