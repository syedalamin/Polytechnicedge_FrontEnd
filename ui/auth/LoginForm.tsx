"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import { useLoginMutation } from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";
import { toast } from "sonner";
import GradientButton from "@/components/shared/GradientButton";

type LoginFormData = z.infer<typeof authSchemas.loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginMutation, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginMutation(data).unwrap();

      if (res?.success && res?.data?.resendOtp) {
        localStorage.setItem("otp_email", res?.data?.email);
        router.push("/verify-otp");
      } else if (res?.success) {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e27] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-white/20">
          <div className="text-center space-y-2">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-400 rounded-xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-14 h-14 bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-sm">
              Sign in to continue to PolytechnicEdge
            </p>
          </div>

          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(authSchemas.loginSchema)}
            defaultValues={{
              email: "superadmin@polytechnicedge.com",
              password: "SuperAdmin@123",
              rememberMe: false,
            }}
          >
            <div className="space-y-4">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
                registerOptions={{ required: "Invalid email address" }}
              />

              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                rightIcon={
                  showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
                registerOptions={{ required: "Password is required" }}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    {...useForm().register("rememberMe")}
                    className="w-4 h-4 rounded border-gray-600 bg-white/10 text-cyan-400 focus:ring-cyan-400"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">
                    {errorMessage}
                  </p>
                </div>
              )}

              <GradientButton isLoading={isLoading}>
                Sign In
                <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </GradientButton>
            </div>
          </Form>

          <p className="text-center text-gray-400 text-sm pt-3 border-t border-white/10">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-semibold hover:brightness-125 transition-all"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
