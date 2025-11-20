"use client";

import React, { useState } from "react";
import type { ChangePasswordAdmin } from "@/types/users";
import { changePasswordAdmin } from "@/actions/users.actions";
import { useNotification } from "@/contexts/NotificationContext";
import { Result } from "antd";

export default function ChangePasswordForm() {
  const [id, setId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const payload: ChangePasswordAdmin = {
        newPassword: newPassword,
      };

      const result = await changePasswordAdmin(id, payload);

      if (result.statusCode == 200) {
        showSuccess("Đổi mật khẩu thành công!",result.message);
        setId("");
        setNewPassword("");
      }
      else {
        showError("Đổi mật khẩu thất bại!",result.message);
      }
    }
    catch (error: any) {
      console.error(error);
      showError(error?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md m-auto mt-10">
      <label className="mb-2 font-semibold">Id người dùng:</label>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
        required
      />

      <label className="mb-2 font-semibold">Mật khẩu mới:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
}
