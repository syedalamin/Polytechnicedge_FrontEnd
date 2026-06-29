"use client";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import GradientButton from "@/components/shared/GradientButton";
import { useResetPasswordMutation } from "@/services/redux/api/modules/authApi";
import { authSchemas } from "@/zodSchemas/auth/auth.schema";
import { ArrowRight, Eye, EyeOff, Lock, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

type ResetPasswordFormData = z.infer<typeof authSchemas.resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const token = searchParams.get("token");
      if (!token) {
        toast.error("Token is missing. Please check your reset password link.");
      }

      const payload = { ...data, token };

      const res = await resetPassword(payload).unwrap();

      if (res?.success) {
        toast.success("Password reset successful!");
        router.push("/login");
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || err?.data;
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
              Reset Password
            </h1>
            <p className="text-gray-300 text-sm">
              reset your password to continue to PolytechnicEdge
            </p>
          </div>

          <Form onSubmit={onSubmit}>
            <div className="space-y-4">
              <InputField
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                rightIcon={
                  showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )
                }
                onRightIconClick={() => setShowNewPassword(!showNewPassword)}
                registerOptions={{ required: "New password is required" }}
              />

              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">
                    {errorMessage}
                  </p>
                </div>
              )}

              <GradientButton isLoading={isLoading}>
                Reset Password
                <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </GradientButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
