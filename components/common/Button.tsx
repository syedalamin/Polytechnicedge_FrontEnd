import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  loadingIcTe?: string | ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  loadingIcTe,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25",
    secondary:
      "inline-flex items-center  text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-semibold hover:brightness-125 transition-all   ",
    ghost:
      "flex items-center gap-2 text-gray-400 hover:text-white transition-colors mx-auto ",
  };

  const sizes = {
    sm: "py-2 px-3 text-xs",
    md: "py-2.5 px-4 text-sm",
    lg: "py-3 px-6 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        loadingIcTe ? (
          loadingIcTe
        ) : (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )
      ) : (
        <>
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
