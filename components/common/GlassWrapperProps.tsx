import { Sparkles } from "lucide-react";
import React, { ReactNode } from "react";


interface GlassWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string | React.ReactNode;
  showIcon?: boolean;
  maxWidthClass?: string;
}

export default function GlassWrapper({
  children,
  title = "Welcome Back",
  subtitle = "Sign in to continue to PolytechnicEdge",
  showIcon = true,
  maxWidthClass = "max-w-sm ",
}: GlassWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4 relative overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className={`w-full ${maxWidthClass} relative z-10`}>
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-white/20">
          
          <div className="text-center space-y-2">
            {showIcon && (
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-400 rounded-xl blur-lg opacity-50 animate-pulse" />
                <div className="relative w-14 h-14 bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>
            )}

            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              {title}
            </h1>
            <p className="text-gray-300 text-sm">{subtitle}</p>
          </div>
 
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
