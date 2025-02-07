import React from "react";
import { ButtonProps } from "../@types/pokemon";

export function Button({ onClick, text, icon, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={text}
      className={`flex items-center px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${className}`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}
