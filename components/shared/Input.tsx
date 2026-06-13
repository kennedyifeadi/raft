"use client";

import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export default function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === "password";
  const type = isPassword ? (showPassword ? "text" : "password") : props.type;

  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={props.name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={type}
          className={`w-full px-3 py-2.5 rounded-lg border text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            meta.touched && meta.error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {meta.touched && meta.error ? (
        <span className="text-red-500 text-xs font-medium">{meta.error}</span>
      ) : null}
    </div>
  );
}
