// src/pages/Festival/components/badge.tsx
import type * as React from "react";

const baseStyle =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";

const variantMap = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-800",
  destructive: "bg-red-600 text-white",
  outline: "border border-gray-300 text-gray-800",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantMap;
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return <div className={`${baseStyle} ${variantMap[variant]} ${className}`} {...props} />;
}
