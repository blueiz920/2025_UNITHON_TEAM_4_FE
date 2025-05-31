// src/components/input.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full rounded-full  bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50"
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input className={`${inputVariants()} ${className || ""}`} ref={ref} {...props} />;
});

Input.displayName = "Input";

export { Input };
