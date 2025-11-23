"use client";

import React, { useEffect, useState } from "react";
import { getUserByID, updateUser, deleteUser } from "@/actions/users.actions";
import { useRouter } from "next/navigation";
import type { IUsers, IParamsUser } from "@/types/users";
import type { IInfoToken } from "@/types/auth";
import { getInfoToken } from "@/actions/auth.actions";
import { useNotification } from "@/contexts/NotificationContext";
import Modal from "@/components/Modal";

export default function GetUserByIDComponent({ params }: { params: IParamsUser }) {
  const [user, setUser] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("");
  const [tokens, setTokens] = useState<IInfoToken | null>(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  // Get token info
  useEffect(() => {
    const fetchToken = async () => {
      const res = await getInfoToken();
      if (res.ok && res.data) setTokens(res.data);
    };
    fetchToken();
  }, []);

  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const res = await getUserByID(params.id.toLowerCase());
      if (res.ok && res.data) {
        setUser(res.data);
        setFullname(res.data.fullname ?? "");
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, [params.id]);

  // Handle update
  const handleUpdate = async () => {
    if (!user) return;

    const res = await updateUser(user.id.toString(), {fullname:params.id});

    if (res.ok) {
      showSuccess("Cập nhật thành công",res.message);
      setUser((prev) => (prev ? { ...prev, fullname } : prev));
    } else {
      showError("Cập nhật thất bại", res.message);
    }

    setShowUpdateModal(false);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!user) return;

    const res = await deleteUser(params.id);

    if (res.ok) {
      showSuccess("Xóa thành công");
      setUser(null);
    } else {
      showError("Xóa thất bại", res.message);
    }

    setShowDeleteModal(false);
  };

  const handleChangePassword = () => {
    router.push(`/users/${params.id}/change-password`);
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-amber-600 text-3xl font-semibold mb-4">
        Thông tin người dùng: {params.id}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-amber-600 text-white text-left">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">FullName</th>
              <th className="px-4 py-3">RoleName</th>
              <th className="px-4 py-3">Cập nhật</th>
              <th className="px-4 py-3">Xóa</th>
              <th className="px-4 py-3">Đổi mật khẩu</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-5 text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : user ? (
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">
                  {user.fullname || <span className="italic text-gray-400">Chưa cập nhật</span>}
                </td>
                <td className="px-4 py-3">{user.roleName}</td>

                <td className="px-4 py-3">
                  <button
                    className="text-green-600 font-semibold hover:underline"
                    onClick={() => setShowUpdateModal(true)}
                  >
                    Cập nhật
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button
                    className="text-red-600 font-semibold hover:underline"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Xóa
                  </button>
                </td>

                <td className="px-4 py-3">
                  {user.username === tokens?.username && (
                    <button
                      className="text-blue-600 font-semibold hover:underline"
                      onClick={handleChangePassword}
                    >
                      Đổi mật khẩu
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5 text-gray-500">
                  Không tìm thấy người dùng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal cập nhật */}
      <Modal show={showUpdateModal} title="Cập nhật người dùng" onClose={() => setShowUpdateModal(false)}>
        <label className="block font-medium mb-2">Fullname:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <button className="bg-green-600 text-white px-5 py-2 mt-4 rounded" onClick={handleUpdate}>
          Lưu thay đổi
        </button>
      </Modal>

      {/* Modal xóa */}
      <Modal show={showDeleteModal} title="Xóa người dùng" onClose={() => setShowDeleteModal(false)}>
        <p className="mb-4">
          Bạn có chắc muốn xóa người dùng: <b>{user?.username}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </Modal>
    </div>
  );
}
