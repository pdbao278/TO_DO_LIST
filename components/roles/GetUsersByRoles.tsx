"use client";

import React, { useEffect, useState } from "react";
import { getUsersByRoleName } from "@/actions/roles.actions";
import type { Users } from "@/types/users";
import { useRouter } from "next/navigation";
import type { ParamsRoles } from "@/types/roles";

export default function GetUsersByRoles({ params }: { params: ParamsRoles }) {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      try {
        const data = await getUsersByRoleName(params.rolesname);
        if (mounted) setUsers(data || []);
      } catch (err) {
        console.error("getUsersByRoleName error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, [params]);

  return (
    <div>
      <h2 className="flex justify-center items-center text-amber-600 h-15 text-3xl  ">Danh sách người dùng</h2>
      <table className="min-w-full table-auto m-auto border-collapse">
        <thead>
          <tr className="bg-amber-600 text-white">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">FullName</th>
            <th className="px-4 py-2 text-left">RoleName</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-gray-100 cursor-pointer hover:bg-blue-200" : "bg-white cursor-pointer hover:bg-blue-200"}
              onClick={() => router.push(`/users/${user.id}`)}
            >
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2 text-gray-500">{user.username}</td>
              <td className="px-4 py-2 text-gray-500">
                {user.fullname ? user.fullname : <span className="italic">Chưa cập nhật</span>}
              </td>
              <td className="px-4 py-2">{user.roleName}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
