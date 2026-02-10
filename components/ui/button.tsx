import { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
};

const classes = {
  primary: "bg-brand-500 text-white hover:bg-brand-700",
  secondary: "bg-white text-brand-700 border border-brand-500 hover:bg-brand-100"
};

export function Button({ children, href, variant = "primary", type = "button", className = "" }: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-md px-5 py-2.5 font-medium transition ${classes[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base}>
      {children}
    </button>
  );
}
