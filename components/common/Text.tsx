import { HTMLAttributes, ReactNode } from "react";

const tagMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  caption: "span",
} as const;

type TextVariant = keyof typeof tagMap;

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: "default" | "primary" | "secondary" | "ghost" | "dimmed" | "white";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  children: ReactNode;
}

export default function Text({
  variant = "body",
  color = "default",
  size,
  children,
  className = "",
  ...props
}: TextProps) {
  const Component = tagMap[variant] || "p";

  const baseStyles = "transition-all duration-300 m-0 p-0 leading-normal";

  const fontWeights = {
    h1: "font-extrabold tracking-tight leading-tight",
    h2: "font-bold tracking-tight leading-tight",
    h3: "font-semibold tracking-tight leading-tight",
    body: "font-normal tracking-tight leading-tight",
    caption: "font-medium uppercase tracking-wider inline-block leading-tight",
  };

  const defaultSizes = {
    h1: "text-3xl md:text-4xl lg:text-5xl",
    h2: "text-2xl md:text-3xl lg:text-4xl",
    h3: "text-xl md:text-2xl lg:text-3xl",
    body: "text-sm md:text-base",
    caption: "text-xs md:text-sm lg:text-base",
  };

  const customSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm md:text-base",
    lg: "text-base md:text-lg",
    xl: "text-lg md:text-2xl",
    "2xl": "text-2xl md:text-4xl",
    "3xl": "text-3xl md:text-5xl",
    "4xl": "text-4xl md:text-6xl",
    "5xl": "text-5xl md:text-6xl lg:text-7xl",
    "6xl": "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    "7xl": "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl",
  };

  const colors = {
    default: "text-gray-900 dark:text-white",
    white: "text-white",
    primary:
      "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 font-bold",
    secondary: "text-cyan-500 dark:text-cyan-400 font-medium ",
    ghost: "text-gray-700 dark:text-gray-300",
    dimmed: "text-gray-400 dark:text-gray-500",
  };

  const activeSize = size ? customSizes[size] : defaultSizes[variant];
  const activeWeight = fontWeights[variant];

  return (
    <Component
      className={`${baseStyles} ${activeWeight} ${colors[color]} ${activeSize} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
