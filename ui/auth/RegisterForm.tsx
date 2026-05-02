"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import { useRegisterMutation } from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";
import { toast } from "sonner";
import SelectField from "@/components/forms/SelectField";
import TextareaField from "@/components/forms/TextareaField";

type RegisterFormData = z.infer<typeof authSchemas.registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerMutation(data).unwrap();
      console.log("Registration successful:", res);
      if (res?.success) {
        router.push("/");
        toast.success(res.message || "Registration successful!");
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e27] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative z-10">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5 border border-white/20">
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
              Join us and shape your future
            </p>
          </div>

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
            <div className="space-y-4 max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

              <div className="grid grid-cols-1   md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1   md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1   md:grid-cols-2 gap-4">
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  registerOptions={{ required: "Date of birth is required" }}
                  type="date"
                  icon={<Calendar className="w-4 h-4" />}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  registerOptions={{ required: "Gender is required" }}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  icon={<User className="w-4 h-4" />}
                />
              </div>
              <TextareaField
                label="Bio"
                name="bio"
                placeholder="Tell us about yourself"
                icon={<FileText className="w-4 h-4" />}
              />
            </div>

            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">
                  {errorMessage}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </Form>

          <p className="text-center text-gray-400 text-xs pt-3 border-t border-white/10">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
