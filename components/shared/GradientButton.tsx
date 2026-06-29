import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function GradientButton({
  isLoading,
  children,
  className = "",
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`w-full py-3 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
