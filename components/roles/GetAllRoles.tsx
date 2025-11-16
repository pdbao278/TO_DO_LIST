"use client";

import React, { useEffect, useState } from "react";
import { getAllRoles } from "@/actions/roles.actions";
import type { Roles } from "@/types/roles";

export default function GetAllRoles() {
  const [roles, setRoles] = useState<Roles[]>([]);

  useEffect(() => {
    getAllRoles().then(setRoles).catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="flex justify-center items-center text-amber-600 h-15 text-3xl">
        Danh sách Roles
      </h2>

      <table className="min-w-full table-auto m-auto border-collapse">
        <thead>
          <tr className="bg-amber-600 text-white">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Display Name</th>
            <th className="px-4 py-2 text-left">Create At</th>
            <th className="px-4 py-2 text-left">Update At</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role, index) => (
            <tr
              key={role.name}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="px-4 py-2">{role.name}</td>
              <td className="px-4 py-2 text-gray-500">{role.displayName}</td>
              <td className="px-4 py-2 text-gray-500">
                {role.createdAt ? (
                  new Date(role.createdAt).toLocaleString()
                ) : (
                  <span className="italic">Chưa có dữ liệu</span>
                )}
              </td>
              <td className="px-4 py-2 text-gray-500">
                {role.updatedAt ? (
                  new Date(role.updatedAt).toLocaleString()
                ) : (
                  <span className="italic">Chưa có dữ liệu</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
