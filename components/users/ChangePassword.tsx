"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { IChangePassword as ChangePasswordType } from "@/types/users";
import { changeUserPassword } from "@/actions/users.actions";
import { useNotification } from "@/contexts/NotificationContext";
interface ChangePasswordFormProps {
  userId: string;
}

export default function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const payload: ChangePasswordType = {
        oldPassword,
        newPassword,
        confirmPassword, 
      };


      const result = await changeUserPassword(userId, payload);

      if (result.statusCode !== 200) {
        showError("Đổi mật khẩu thất bại!");
      } else {
        showSuccess("Đổi mật khẩu thành công!");
        router.push("/auth");
      }
    } catch (error: any) {
      console.error(error);
      showError(error?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md m-auto mt-10">
      <label className="mb-2 font-semibold">Mật khẩu cũ:</label>
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
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

      <label className="mb-2 font-semibold">Xác nhận mật khẩu mới:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
