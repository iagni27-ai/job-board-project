"use client";

import { useState } from "react";
import FormField from "@/components/auth/FormField";

// Field password dengan tombol "Lihat/Sembunyikan". Tombol bisa dijangkau
// keyboard dan memberi tahu screen reader lewat aria-pressed.
export default function PasswordField(props) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      suffix={
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-pressed={visible}
          aria-controls={props.id}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          {visible ? "Sembunyikan" : "Lihat"}
        </button>
      }
    />
  );
}
