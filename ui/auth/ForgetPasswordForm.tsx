"use client";
import Button from "@/components/common/Button";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";

import GlassWrapper from "@/components/ui/GlassWrapperProps";
import { useForgetPasswordMutation } from "@/services/redux/api/modules/authApi";
import { authSchemas } from "@/zodSchemas/auth/auth.schema";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

type ForgetPasswordFormData = z.infer<typeof authSchemas.forgetPasswordSchema>;

export default function ForgetPasswordForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      const res = await forgetPassword(data).unwrap();

      if (res?.success) {
        toast.success("Password reset email sent successfully!");
        setMessage(res?.message);
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || err?.data;
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <GlassWrapper
      title="Forget Password"
      subtitle="Enter your email to reset your password"
      maxWidthClass="max-w-sm md:max-w-md "
    >
      <Form onSubmit={onSubmit}>
        <div className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={<Lock className="w-4 h-4" />}
            registerOptions={{ required: "Email is required" }}
          />

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{errorMessage}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
              <p className="text-green-400 text-sm text-center">{message}</p>
            </div>
          )}

          <Button
            loading={isLoading}
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4 inline-block ml-2" />}
          >
            Forget Password
          </Button>
        </div>
      </Form>
    </GlassWrapper>
  );
}
