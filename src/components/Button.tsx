import React from "react";
import { ButtonProps } from "../@types/pokemon";

export function Button({ onClick, text, icon }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={text}
      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}
