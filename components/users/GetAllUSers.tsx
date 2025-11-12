"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/actions/users.actions";
import type { Users } from "@/types/users";

export default function GetAllUsers() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.fullname} ({user.username}) - Vai trò: {user.roleName}
          </li>
        ))}
      </ul>
    </div>
  );
}
