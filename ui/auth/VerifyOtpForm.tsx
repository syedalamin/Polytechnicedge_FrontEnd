"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Mail, KeyRound, RefreshCw, ArrowLeft } from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import {
  useVerifyEmailOtpAndLoginMutation,
  useResendOtpMutation,
} from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";
import { toast } from "sonner";

type VerifyOtpFormData = z.infer<typeof authSchemas.verifyEmailOtpAndLoginSchema>;

export default function VerifyOtpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [verifyOtpMutation, { isLoading }] =
    useVerifyEmailOtpAndLoginMutation();
  const [resendOtpMutation, { isLoading: resendLoading }] =
    useResendOtpMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("otp_email");
    if (storedEmail) {
      setEmail(storedEmail);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e27] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
          <div className="text-center space-y-2">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <KeyRound className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Verify Your Email
            </h1>
            <p className="text-gray-300 text-sm">
              Enter the OTP sent to{" "}
              <span className="text-cyan-400 font-semibold">{email}</span>
            </p>
          </div>

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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </button>
            </div>
          </Form>

          <div className="text-center space-y-3">
            <p className="text-gray-400 text-sm">Didn't receive the code?</p>
            <button
              onClick={handleResendOtp}
              disabled={resendDisabled || resendLoading}
              className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold hover:brightness-125 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              {resendLoading
                ? "Resending..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend OTP"}
            </button>
          </div>

          <button
            onClick={() => router.push("/register")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Register
          </button>
        </div>
      </div>
    </div>
  );
}
