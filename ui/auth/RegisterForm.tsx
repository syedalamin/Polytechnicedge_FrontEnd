"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Phone, MapPin, Calendar, FileText } from "lucide-react";
import Form from "../../components/forms/Form";
import InputField from "../../components/forms/InputField";
import { useRegisterMutation } from "../../services/redux/api/modules/authApi";
import { authSchemas } from "../../zodSchemas/auth/auth.schema";

type RegisterFormData = z.infer<typeof authSchemas.registerSchema>;

function RegisterFormFields() {
  const { register } = useFormContext<RegisterFormData>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          registerOptions={{ required: "First name is required" }}
          placeholder="John"
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
          minLength: { value: 8, message: "Password must be at least 8 characters" },
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

      <InputField
        label="Contact Number"
        name="contactNumber1"
        type="tel"
        placeholder="+1234567890"
        icon={<Phone className="w-4 h-4" />}
      />

      <InputField
        label="Address"
        name="address"
        placeholder="Your address"
        icon={<MapPin className="w-4 h-4" />}
      />

      <InputField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        icon={<Calendar className="w-4 h-4" />}
      />

      <InputField
        label="Bio"
        name="bio"
        placeholder="Tell us about yourself"
        icon={<FileText className="w-4 h-4" />}
      />
    </>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const [register, { isLoading, error }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data).unwrap();
      router.push("/login?registered=true");
    } catch (err) {
      console.error("Registration failed:", err);
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
    return "Registration failed. Please try again.";
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e27] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-lg sm:max-w-xl relative z-10">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 flex flex-col h-[85vh] sm:h-[90vh] max-h-[800px]">
          <div className="p-6 pb-4 text-center space-y-2">
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
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-4 space-y-4 custom-scrollbar">
              <RegisterFormFields />
            </div>

            <div className="p-6 pt-4 border-t border-white/10 space-y-4">
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-center text-gray-400 text-xs">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold"
                >
                  Sign in
                </a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
