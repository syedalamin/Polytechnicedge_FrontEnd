import { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
 
  paddingSize?: "xs" | "sm" | "md" | "lg";
}

export default function GlassCard({
  children,
  paddingSize = "md", 
  className = "",
  ...props
}: GlassCardProps) {
 
  const paddingStyles = {
    xs: "p-1 sm:p-2 rounded-sm",  
    sm: "p-2 sm:p-3 rounded-md",
    md: "p-3 sm:p-4 rounded-lg",
    lg: "p-5 md:p-6 rounded-xl",
    xl: "p-6 md:p-8 rounded-xl", 
  };

   
  const baseStyles =
    "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl transition-all duration-300";

  return (
    <div
      className={`${baseStyles} ${paddingStyles[paddingSize]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
