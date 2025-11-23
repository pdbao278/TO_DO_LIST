"use client";

import React, { useState } from "react";
import type { ICreateToken } from "@/types/tokens";
import {createToken } from "@/actions/tokens.action";
import { useNotification } from "@/contexts/NotificationContext";
import { Result } from "antd";

export default function ChangePasswordForm() {
  const [id, setId] = useState(0);
  const [deviceId, setdeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const payload: ICreateToken = {
        id:id,
        deviceId:deviceId
      };

      const result = await createToken(payload);

      if (result.statusCode == 201) {
        showSuccess("Tạo token thành công!",result.message);
        setId(0);
        setdeviceId("");
      }
      else {
        showError("Tạo token thất bại!",result.message);
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
<form onSubmit={handleSubmit} className="flex flex-col max-w-md m-auto mt-10 space-y-6">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">Id người dùng:</label>
    <input
      type="number"
      value={isNaN(id) ? 0 : id} 
      onChange={(e) => setId(e.target.valueAsNumber)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">DeviceId:</label>
    <input
      type="text"
      value={deviceId}
      onChange={(e) => setdeviceId(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
    disabled={loading}
  >
    {loading ? "Đang xử lý..." : "Tạo token"}
  </button>
</form>

  );
}
