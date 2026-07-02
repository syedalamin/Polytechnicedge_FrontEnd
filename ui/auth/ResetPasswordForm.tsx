"use client";
import Button from "@/components/common/Button";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import GlassWrapper from "@/components/common/GlassWrapperProps";
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
    <GlassWrapper
      title="Reset Password"
      subtitle="Reset your password to continue to PolytechnicEdge"
      maxWidthClass="max-w-sm md:max-w-md "
    >
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
              <p className="text-red-400 text-sm text-center">{errorMessage}</p>
            </div>
          )}

          <Button loading={isLoading} className="w-full">
            Reset Password
            <ArrowRight className="w-4 h-4 inline-block ml-2" />
          </Button>
        </div>
      </Form>
    </GlassWrapper>
  );
}
