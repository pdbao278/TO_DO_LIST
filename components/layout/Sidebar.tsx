"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getInfoToken } from "@/actions/auth.actions";
import { IInfoToken } from "@/types/auth";

export default function Sidebar() {
  const router = useRouter();
  const [tokens, setTokens] = useState<IInfoToken | null>(null);

  // Fetch user information
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await getInfoToken();
        if (response.ok && response.data) {
          setTokens(response.data); // Set the token data
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <a
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <span className="material-icons">Home</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => router.push("/users")}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <span className="material-icons">Users</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => router.push("/roles")}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <span className="material-icons">Roles</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => router.push("/tokens")}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <span className="material-icons">Tokens</span>
          </a>
        </li>

        {/* Check if token.role is 'admin' to display the change password link */}
        {tokens?.role === "Admin" && (
          <li>
            <a
              onClick={() => router.push(`/users/${tokens.sub}/change-password-admin`)}
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              <span>Admin - Đổi mật khẩu</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
