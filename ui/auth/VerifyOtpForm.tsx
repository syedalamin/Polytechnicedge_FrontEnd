"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { KeyRound, RefreshCw, ArrowLeft } from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import {
  useVerifyEmailOtpAndLoginMutation,
  useResendOtpMutation,
} from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";
import { toast } from "sonner";
import GlassWrapper from "@/components/common/GlassWrapperProps";
import Button from "@/components/common/Button";
import Link from "next/link";

type VerifyOtpFormData = z.infer<
  typeof authSchemas.verifyEmailOtpAndLoginSchema
>;

export default function VerifyOtpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isChecking, setIsChecking] = useState(true);

  const [verifyOtpMutation, { isLoading }] =
    useVerifyEmailOtpAndLoginMutation();
  const [resendOtpMutation, { isLoading: resendLoading }] =
    useResendOtpMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("otp_email");
    if (storedEmail) {
      setEmail(storedEmail);
      setIsChecking(false);
    } else {
      router.push("/register");
    }
  }, [router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      const res = await verifyOtpMutation({
        email,
        otp: data.otp,
      }).unwrap();
      if (res?.success) {
        localStorage.removeItem("otp_email");
        toast.success("Email verified successfully!");
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await resendOtpMutation({ email }).unwrap();
      if (res?.success) {
        toast.success("OTP resent successfully!");
        setResendDisabled(true);
        setCountdown(60);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP.");
    }
  };

  if (isChecking) {
    return null;
  }

  return (
    <GlassWrapper
      title="Verify Your Email"
      subtitle={
        <>
          Enter the OTP sent to{" "}
          <span className="text-cyan-400 font-semibold ">{email}</span>
        </>
      }
      maxWidthClass="max-w-sm md:max-w-md "
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(authSchemas.verifyEmailOtpAndLoginSchema)}
        defaultValues={{
          otp: "",
        }}
      >
        <div className="space-y-4">
          <InputField
            label="OTP Code"
            name="otp"
            placeholder="Enter 6-digit OTP"
            icon={<KeyRound className="w-4 h-4" />}
            registerOptions={{ required: "OTP is required" }}
          />

          <Button
            disabled={isLoading}
            className="w-full"
            loading={isLoading}
            loadingIcTe={"verifying"}
          >
            Verify & Login
          </Button>
        </div>
      </Form>

      <div className="text-center space-y-3">
        <p className="text-gray-400 text-sm">Didn't receive the code?</p>
        <Button
          onClick={handleResendOtp}
          disabled={resendDisabled || resendLoading}
          variant="secondary"
          leftIcon={<RefreshCw className="w-4 h-4 text-cyan-400" />}
        >
          {resendLoading
            ? "Resending..."
            : countdown > 0
              ? `Resend in ${countdown}s`
              : "Resend OTP"}
        </Button>
      </div>

      <Link href="/register">
        <Button leftIcon={<ArrowLeft className="w-4 h-4" />} variant="ghost">
          Back to Register
        </Button>
      </Link>
    </GlassWrapper>
  );
}
