"use client";

import React, { useEffect, useState } from "react";
import { getUserByID } from "@/actions/users.actions";
import { updateUser, deleteUser } from "@/actions/users.actions";
import type { Users } from "@/types/users";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { ParamsUser } from "@/types/users";
import { useNotification } from "@/contexts/NotificationContext";
import { IInfoToken } from "@/types/auth";
import { getInfoToken } from "@/actions/auth.actions";

export default function GetUserByIDComponent({ params }: { params: ParamsUser }) {
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { showSuccess, showError } = useNotification();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tokens, setTokens] = useState<IInfoToken | null>(null);
  const [fullname, setFullname] = useState("");
  const router = useRouter();

  // Fetch user information
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await getInfoToken();
        if (response.ok && response.data) {
          setTokens(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const fetchedUser = await getUserByID(params.id.toLowerCase());
      setUser(fetchedUser);
      setFullname(fetchedUser?.fullname || "");
      setLoading(false);
    }

    fetchUser();
  }, [params.id]);

  // Handle update
  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await updateUser(user.id.toString(), fullname);

      if (res?.statusCode === 200) {
        showSuccess("Cập nhật thành công", res.message || "Thông tin người dùng đã được cập nhật.");
        setUser((prev) => (prev ? { ...prev, fullname } : prev));
      } else {
        showError("Cập nhật thất bại", res?.message || "Cập nhật thông tin người dùng thất bại.");
      }
    } catch (err: any) {
      showError("Có lỗi xảy ra!", err?.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setShowUpdateModal(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!user) return;

    try {
      const res = await deleteUser(user.id.toString());

      if (res?.statusCode === 200) {
        showSuccess("Xóa thành công", res?.message || "Tài khoản đã được xóa khỏi hệ thống.");
        setUser(null); // Clear user data
      } else {
        showError("Xóa thất bại", res?.message || "Không thể xóa tài khoản.");
      }
    } catch (err: any) {
      showError("Có lỗi xảy ra!", err?.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Change password
  const handleChangePassword = () => {
    router.push(`/users/${params.id}/change-password`);
  };

  return (
    <div>
      <h2 className="flex justify-center items-center text-amber-600 h-15 text-3xl">
        Thông tin người dùng
      </h2>

      <table className="min-w-full table-auto m-auto border-collapse mt-4">
        <thead>
          <tr className="bg-amber-600 text-white">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">FullName</th>
            <th className="px-4 py-2 text-left">RoleName</th>
            <th className="px-4 py-2 text-left">Cập nhật</th>
            <th className="px-4 py-2 text-left">Xóa</th>
            <th className="px-4 py-2 text-left">Đổi mật khẩu</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : user ? (
            <tr className={user.id % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2 text-gray-500">{user.username}</td>
              <td className="px-4 py-2 text-gray-500">
                {user.fullname || <span className="italic">Chưa cập nhật</span>}
              </td>
              <td className="px-4 py-2">{user.roleName}</td>
              <td className="px-4 py-2 text-green-600 font-bold cursor-pointer">
                <button onClick={() => setShowUpdateModal(true)}>Cập nhật</button>
              </td>
              <td className="px-4 py-2 text-red-600 font-bold cursor-pointer">
                <button onClick={() => setShowDeleteModal(true)}>Xóa</button>
              </td>
              <td className="px-4 py-2">
                {user.username === tokens?.username && !loading && (
                  <span
                    className="text-red-600 font-bold cursor-pointer"
                    onClick={handleChangePassword}
                  >
                    Đổi mật khẩu
                  </span>
                )}
                {loading && <span>Đang xử lý...</span>}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Không tìm thấy người dùng
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === Modal Cập nhật === */}
      <Modal
        show={showUpdateModal}
        title="Cập nhật người dùng"
        onClose={() => setShowUpdateModal(false)}
      >
        <div>
          <label>Fullname:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border w-full p-2 mt-1"
          />

          <button
            className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
            onClick={handleUpdate}
          >
            Lưu thay đổi
          </button>
        </div>
      </Modal>

      {/* === Modal Xóa === */}
      <Modal
        show={showDeleteModal}
        title="Xóa người dùng"
        onClose={() => setShowDeleteModal(false)}
      >
        <p>Bạn có chắc muốn xóa người dùng: <b>{user?.username}</b>?</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => setShowDeleteModal(false)}
          >
            Hủy
          </button>

          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </Modal>
    </div>
  );
}
