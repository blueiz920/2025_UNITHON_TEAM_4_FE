// src/pages/Festival/components/tabs.tsx
import * as React from "react";

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 flex gap-2 border-b pb-2">{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  onClick?: (value: string) => void;
  isActive?: boolean;
}

export function TabsTrigger({ value, children, onClick, isActive = false }: TabsTriggerProps) {
  return (
    <button
      onClick={() => onClick?.(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive ? "border-b-2 border-rose-500 text-rose-500" : "text-gray-500 hover:text-rose-500"
      }`}
    >
      {children}
    </button>
  );
}
