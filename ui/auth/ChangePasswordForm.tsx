"use client";

import Button from "@/components/common/Button";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import GlassWrapper from "@/components/ui/GlassWrapperProps";
import { useChangePasswordMutation } from "@/services/redux/api/modules/authApi";
import { authSchemas } from "@/zodSchemas/auth/auth.schema";

import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

type ChangePasswordFormData = z.infer<typeof authSchemas.changePasswordSchema>;

export default function ChangePasswordForm() {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const res = await changePassword(data).unwrap();
      if (res?.success) {
        toast.success("Password changed successfully!");
        router.refresh();
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
      title="Change Password"
      subtitle="Change your password to continue to PolytechnicEdge"
      maxWidthClass="max-w-sm md:max-w-md "
    >
      <Form onSubmit={onSubmit}>
        <div className="space-y-4">
          <InputField
            label="Old Password"
            name="oldPassword"
            type={showOldPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            rightIcon={
              showOldPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
            onRightIconClick={() => setShowOldPassword(!showOldPassword)}
            registerOptions={{ required: "Old password is required" }}
          />
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

          <Button
            loading={isLoading}
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4 inline-block ml-2" />}
          >
            Change Password
          </Button>
        </div>
      </Form>
    </GlassWrapper>
  );
}
