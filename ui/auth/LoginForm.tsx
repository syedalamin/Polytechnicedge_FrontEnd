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

import GlassWrapper from "@/components/ui/GlassWrapperProps";
import Button from "@/components/common/Button";
import Link from "next/link";

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
        localStorage.removeItem("otp_email");
        localStorage.setItem("otp_email", res?.data?.email);
        router.push("/verify-otp");
      } else if (res?.success) {
        localStorage.removeItem("otp_email");
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
    <GlassWrapper
      title="Welcome Back"
      subtitle="Sign in to continue to PolytechnicEdge"
      maxWidthClass="max-w-sm md:max-w-md "
    >
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
            <Link
              href={"/forget-password"}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{errorMessage}</p>
            </div>
          )}

          <Button
            loading={isLoading}
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4 inline-block ml-2" />}
          >
            Sign In
          </Button>
        </div>
      </Form>

      <p className="text-center text-gray-400 text-sm pt-3 border-t border-white/10">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-semibold"
        >
          Create account
        </Link>
      </p>
    </GlassWrapper>
  );
}
