"use client";
import React, { useEffect, useState } from "react";
import { getRoleByID, updateRole, deleteRole } from "@/actions/roles.actions"; 
import type { IRoles } from "@/types/roles";
import type { IParamsUser } from "@/types/users";
import { useNotification } from "@/contexts/NotificationContext";
import Modal from "@/components/Modal";

export default function GetRoleByIDComponent({ params }: { params: IParamsUser }) {
  const [role, setRole] = useState<IRoles | null>(null);
  const [loading, setLoading] = useState(true);

  const { showSuccess, showError } = useNotification();

  // Modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form update
  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");

  // Fetch Role
  useEffect(() => {
    async function fetchRole() {
      try {
        setLoading(true);
        const fetchedRole = await getRoleByID(params.id); // IShowResponse<IRoles>
        if (fetchedRole.ok) {
          setRole(fetchedRole.data);
          setDisplayName(fetchedRole.data.displayName || "");
          setName(fetchedRole.data.name || "");
        } else {
          showError("Lấy thông tin vai trò thất bại!", fetchedRole.message);
        }
      } catch (error: any) {
        showError("Lấy thông tin vai trò thất bại!", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [params.id]);

  // Handle update
  const handleUpdate = async () => {
    if (!role) return;

    try {
      const res = await updateRole(params.id, { name, displayName }); // IResponse

      if (res.ok) {
        showSuccess("Cập nhật thành công", "Thông tin vai trò đã được cập nhật.");

        setRole((prev) =>
          prev
            ? {
                ...prev,
                name,
                displayName,
              }
            : null
        );
      } else {
        showError("Cập nhật thất bại", res.message);
      }
    } catch (err: any) {
      showError("Có lỗi xảy ra!", err?.message);
    } finally {
      setShowUpdateModal(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!role) return;

    try {
      const res = await deleteRole(params.id); // IResponse

      if (res.ok) {
        showSuccess("Xóa thành công", "Vai trò đã được xóa.");
        setRole(null);
      } else {
        showError("Xóa thất bại", res.message);
      }
    } catch (err: any) {
      showError("Có lỗi xảy ra!", err?.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center items-center text-amber-600 h-15 text-3xl">
        Thông tin Vai trò
      </h2>

      <table className="min-w-full table-auto m-auto border-collapse mt-4">
        <thead>
          <tr className="bg-amber-600 text-white">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Display Name</th>
            <th className="px-4 py-2 text-left">Ngày tạo</th>
            <th className="px-4 py-2 text-left">Ngày cập nhật</th>
            <th className="px-4 py-2 text-left">Cập nhật</th>
            <th className="px-4 py-2 text-left">Xóa</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : !role ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                Không tìm thấy vai trò
              </td>
            </tr>
          ) : (
            <tr className="bg-gray-100">
              <td className="px-4 py-2">{params.id}</td>
              <td className="px-4 py-2">{role.name}</td>
              <td className="px-4 py-2">{role.displayName}</td>
              <td className="px-4 py-2">
                {role.createdAt ? new Date(role.createdAt).toLocaleString() : "—"}
              </td>
              <td className="px-4 py-2">
                {role.updatedAt ? new Date(role.updatedAt).toLocaleString() : "—"}
              </td>

              <td className="px-4 py-2 text-green-600 font-bold cursor-pointer">
                <button onClick={() => setShowUpdateModal(true)}>Cập nhật</button>
              </td>

              <td className="px-4 py-2 text-red-600 font-bold cursor-pointer">
                <button onClick={() => setShowDeleteModal(true)}>Xóa</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === Modal Update === */}
      <Modal
        show={showUpdateModal}
        title="Cập nhật vai trò"
        onClose={() => setShowUpdateModal(false)}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-2 mt-1"
          />

          <label>Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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

      {/* === Modal Delete === */}
      <Modal
        show={showDeleteModal}
        title="Xóa vai trò"
        onClose={() => setShowDeleteModal(false)}
      >
        <p>
          Bạn có chắc muốn xóa vai trò: <b>{role?.displayName}</b>?
        </p>

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
