"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import { useRegisterMutation } from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";
import { toast } from "sonner";

import TextareaField from "@/components/forms/TextareaField";
import GlassWrapper from "@/components/ui/GlassWrapperProps";
import Link from "next/link";
import Button from "@/components/common/Button";

type RegisterFormData = z.infer<typeof authSchemas.registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerMutation(data).unwrap();

      if (res?.success) {
        const userEmail = res?.data?.email || data.email;
        localStorage.setItem("otp_email", userEmail);
        router.push("/verify-otp");
        toast.success(
          res.message || "Registration successful! Please verify your email.",
        );
      }
    } catch (err) {
      const error = err as any;
      setErrorMessage(
        error?.data?.message ||
          error?.data ||
          "Registration failed. Please try again.",
      );
      toast.error("Registration failed");
    }
  };

  return (
    <GlassWrapper
      title="Join PolytechnicEdge"
      subtitle="Create your account to get started"
      maxWidthClass="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl  "
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(authSchemas.registerSchema)}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          middleName: "",
          bio: "",
          address: "",
          gender: "",
          contactNumber1: "",
          contactNumber2: "",
          dateOfBirth: "",
        }}
      >
        <div className="space-y-4 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              registerOptions={{ required: "First name is required" }}
              placeholder="John"
              icon={<User className="w-4 h-4" />}
            />
            <InputField
              label="Middle Name"
              name="middleName"
              placeholder="Jane"
              icon={<User className="w-4 h-4" />}
            />

            <InputField
              label="Last Name"
              name="lastName"
              registerOptions={{ required: "Last name is required" }}
              placeholder="Doe"
              icon={<User className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <InputField
              label="Contact Number"
              name="contactNumber1"
              registerOptions={{ required: "Contact number is required" }}
              type="tel"
              placeholder="+1234567890"
              icon={<Phone className="w-4 h-4" />}
            />

            <InputField
              label="Address"
              name="address"
              registerOptions={{ required: "Address is required" }}
              placeholder="Your address"
              icon={<MapPin className="w-4 h-4" />}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <TextareaField
              label="Bio"
              name="bio"
              placeholder="Tell us about yourself"
              icon={<FileText className="w-4 h-4" />}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <Button
          disabled={isLoading}
          className="w-full"
          loading={isLoading}
          loadingIcTe={"Creating account..."}
        >
          Create Account
        </Button>
      </Form>

       

      <p className="text-center text-gray-400 text-xs pt-3 border-t border-white/10">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </GlassWrapper>
  );
}
