import React from "react";
import ChangePasswordAdmin from "@/components/users/ChangePasswordAdmin"; 
import type { ParamsUser } from "@/types/users";

export default async function UsersPage() {

  return (
    <main>
      <h2 className="flex justify-center items-center text-amber-600 h-15 text-3xl">
        Đổi mật khẩu người dùng của Admin: 
      </h2>

      <ChangePasswordAdmin />
    </main>
  );
}
