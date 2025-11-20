"use client";

import React, { useState } from "react";
import type { NewRoles } from "@/types/roles";
import { createRole } from "@/actions/roles.actions";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
export default function AddRoles() {
    const router = useRouter();
    const [displayName, setDisplayName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { showSuccess, showError } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newRoles: NewRoles = {
                name,
                displayName,
            };

            const result = await createRole(newRoles);
            if (result?.statusCode === 201) {
                showSuccess("Thêm role thành công!",
                    result.message || "Role mới đã được thêm."
                );
                setName("");
                setDisplayName("");
                router.refresh()
            } else {
                showError("Thêm role thất bại!",
                    result.message || "Thêm role thất bại!");
            }
        } catch (error: any) {
            console.error(error);
            showError(error?.message || "Có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    };

    return (
<div className="p-8 bg-white rounded-lg shadow-md mb-6 max-w-3xl m-auto">
  <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Thêm roles mới:</h1>
  
  <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-80 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      placeholder="Nhập Name"
      required
    />

    <input
      type="text"
      value={displayName}
      onChange={(e) => setDisplayName(e.target.value)}
      className="w-80 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      placeholder="Nhập Display Name"
      required
    />
    
    <button
      type="submit"
      disabled={loading}
      className="w-80 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {loading ? "Đang thêm..." : "Thêm Roles"}
    </button>
    
  </form>
</div>

    );
}
