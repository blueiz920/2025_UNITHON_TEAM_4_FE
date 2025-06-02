// src/pages/Festival/components/badge.tsx
import type * as React from "react";

const baseStyle =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors z-10";

const variantMap = {
  default: "bg-[#ff651b]/90 text-[#fffefb] hover:bg-opacity-70 ",
  secondary: "bg-gray-100 text-[#fffefb] hover:bg-gray-200",
  destructive: "bg-red-600 text-white",
  outline: "border border-gray-300 text-[#fffefb]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantMap;
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return <div className={`${baseStyle} ${variantMap[variant]} ${className}`} {...props} />;
}
