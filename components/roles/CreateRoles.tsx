"use client";

import React, { useState } from "react";
import type { NewRole } from "@/types/roles";
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
            const newRoles: NewRole = {
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
        <div className="p-4">
            <form
                className="flex items-center justify-center gap-2"
                onSubmit={handleSubmit}
            >
                <label className="mb-1 font-semibold">Nhập Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-2 w-64"
                    required
                />

                <label className="mb-1 font-semibold">Nhập Display Name</label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-4 w-64"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {loading ? "Đang thêm..." : "Thêm Roles"}
                </button>
            </form>
        </div>
    );
}
