"use client";

import { useEffect, useState } from "react";
import { setRoleToken } from "@/actions/tokens.action";
import type { SetRoleToken } from "@/types/tokens";
import { useNotification } from "@/contexts/NotificationContext";
import { getAllRoles } from "@/actions/roles.actions";
import type { Roles } from "@/types/roles";
export default function SearchRoles() {
    const { showSuccess, showError } = useNotification();
    const [id, setId] = useState(0);
    const [roleName, setRoleName] = useState("");
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Roles[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await getAllRoles();
                setRoles(roles);
            } catch (error) {
                console.error(error);
                showError("Có lỗi xảy ra!");
            }
        };
        fetchRoles();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload: SetRoleToken = {
            id: id,
            roleName: roleName,
        };

        setLoading(true);

        try {
            const result = await setRoleToken(payload);
            if (result.statusCode !== 200) {
                showError("Thiết lập vai trò thất bại!", result.message || "Đã xảy ra lỗi khi thiết lập vai trò.");
            } else {
                showSuccess("Thiết lập vai trò thành công!", result.message || "Vai trò đã được thiết lập thành công");
                setId(0);
                setRoleName("");
            }
        } catch (error) {
            console.error(error);
            showError("Có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    };

     return (
    <div className="p-8 max-w-3xl m-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-amber-600 mb-6">
        Đổi vai trò
      </h1>
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full max-w-sm">
          <label htmlFor="userId" className="mb-2 text-lg font-medium">
            ID Người Dùng
          </label>
          <input
            id="userId"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.valueAsNumber)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            placeholder="Nhập id người dùng"
            required
          />
        </div>

        <div className="flex flex-col w-full max-w-sm">
          <label htmlFor="roleName" className="mb-2 text-lg font-medium">
            Tên Vai Trò
          </label>
          <select
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            required
          >
            <option value="" disabled>Chọn vai trò</option>
            {roles.map((role) => (
              <option key={role.name} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 w-full max-w-sm"
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Đổi vai trò"}
        </button>
      </form>
    </div>
  );
}
