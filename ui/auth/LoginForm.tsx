"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import { useLoginMutation } from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";

type LoginFormData = z.infer<typeof authSchemas.loginSchema>;

function LoginFormFields() {
  const { register } = useFormContext<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputField
        label="Email"
        name="email"
        registerOptions={{ required: "Invalid email address" }}
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="w-4 h-4" />}
      />

      <InputField
        label="Password"
        name="password"
        registerOptions={{
          required: "Password is required",
        }}
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
      />

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
          />
          <span className="text-gray-300">Remember me</span>
        </label>

        <a href="/forgot-password" className="text-cyan-400 hover:text-cyan-300">
          Forgot?
        </a>
      </div>
    </>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const getErrorMessage = (): string | null => {
    if (!error) return null;
    if (
      typeof error === "object" &&
      "data" in error &&
      error.data &&
      typeof error.data === "object" &&
      "message" in error.data
    ) {
      return String(error.data.message);
    }
    return "Login failed. Please try again.";
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e27] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-6 space-y-5 border border-white/20">
          <div className="text-center space-y-2">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              PolytechnicEdge
            </h1>
            <p className="text-gray-300 text-sm">
              Shape your future with innovation
            </p>
          </div>

          <Form
            onSubmit={onSubmit}
            resolver={zodResolver(authSchemas.loginSchema)}
            defaultValues={{ email: "", password: "", rememberMe: false }}
          >
            <div className="space-y-4">
              <LoginFormFields />
            </div>

            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </Form>

          <p className="text-center text-gray-400 text-xs pt-3 border-t border-white/10">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
