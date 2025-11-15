"use client";
import React, { useEffect, useState } from "react";
import { getUserByID } from "@/actions/users.actions";
import { updateUser, deleteUser } from "@/actions/users.actions";
import type { Users } from "@/types/users";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
interface GetUserByIDComponentProps {
  params: {
    id: string;
  };
}

export default function GetUserByIDComponent({ params }: GetUserByIDComponentProps) {
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // State modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form update
  const [fullname, setFullname] = useState("");

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

  // Xử lý update
  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await updateUser(user.id.toString(), fullname);
      if (res.statusCode === 200) {
        alert("Cập nhật thành công!");
        setUser((prev) => (prev ? { ...prev, fullname: fullname } : prev));
      } else {
        alert("Cập nhật thất bại!");
      }
      
      setShowUpdateModal(false);
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật!");
      console.error(error);
    }
  };

  // Xử lý xóa
const handleDelete = async () => {
  if (!user) return;

  try {
    const res = await deleteUser(user.id.toString());

    // Tùy API của bạn trả về gì, ở đây bạn nói statusCode=200
    if (res.statusCode === 200) {
      alert("Xóa thành công!");
      // Xóa khỏi UI → user = null
      setUser(null);

      setShowDeleteModal(false);
    } else {
      alert("Xóa thất bại!");
    }

  } catch (error) {
    console.error(error);
    alert("Có lỗi xảy ra khi xóa!");
  }
};
  // Đổi mât khẩu
  const router = useRouter();
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
              <td className="px-4 py-2 text-red-600 font-bold cursor-pointer" onClick={handleChangePassword}>Đổi mật khẩu</td>
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
