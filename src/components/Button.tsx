import React from "react";
import { ButtonProps } from "../@types/pokemon";

export function Button({ onClick, text, icon }: ButtonProps) {
  return (
    <button onClick={onClick} aria-label={text} className="btn">
      {icon}
      {text}
    </button>
  );
}
