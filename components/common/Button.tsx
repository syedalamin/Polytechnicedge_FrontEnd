import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "edit"
    | "remove"
    | "more";
  size?: "xs"|"sm" | "md" | "lg" | "action";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  centerIcon?: ReactNode;
  children?: ReactNode;
  loadingIcTe?: string | ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  centerIcon,
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

    outline:
      "flex items-center justify-center gap-2  rounded-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs sm:text-sm",

    edit: "p-1 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/10 ",
    remove:
      "p-1 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/10",
    more: "p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10",
  };

  const sizes = {
    xs: "py-1.5 px-2 text-xs ",
    sm: "py-1.5 px-2.5 text-xs md:py-2 md:px-3 md:text-sm",
    md: "py-2 px-3 text-xs lg:py-2.5 lg:px-4 lg:text-sm",
    lg: "py-2.5 px-4 text-sm md:py-3 md:px-6 md:text-base lg:text-lg",
    action: "p-2",
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
          {centerIcon ? (
            <span className="inline-flex">{centerIcon}</span>
          ) : (
            <>
              {leftIcon && <span className="inline-flex">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex">{rightIcon}</span>}
            </>
          )}
        </>
      )}
    </button>
  );
}
