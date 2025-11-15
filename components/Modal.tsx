"use client";

import React from "react";

interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ show, title, onClose, children }: ModalProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded w-96 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
