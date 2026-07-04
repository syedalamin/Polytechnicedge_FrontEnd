"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import {
  Eye,
  EyeOff,
  FileText,
  Image,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import TextareaField from "@/components/forms/TextareaField";
import z from "zod";
import { adminSchema } from "@/zodSchemas/admin/adminSchema";
import SelectField from "@/components/forms/SelectField";

type AdminFormData = z.infer<typeof adminSchema.createAdminSchema>;

const CreateAdminModal = () => {
  const dispatch = useAppDispatch();
  const isCreateModalOpen = useAppSelector(
    (state: any) => !!state.modal?.["addAdmin"],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  



  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];





  const onSubmit = async (data: AdminFormData) => {
    try {
      console.log("Form submitted with data:", data);
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(closeModal("addAdmin"))}
      title="Create Admin"
      modalSize="lg"
      confirmLabel="Create Admin"
    >
      <Form
        onSubmit={onSubmit}
        //  resolver={zodResolver(authSchemas.registerSchema)}
        defaultValues={{
          firstName: "",
          lastName: "",
          middleName: "",
          email: "",
          password: "",
          gender: "",
          profileImage: "",
          backgroundImage: "",
          address: "",
          contactNumber1: "",
          bio: "",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectField
              label="Gender"
              name="gender"
              options={genderOptions}
              placeholder="Select gender"
            />
            <InputField
              label="Profile Image URL"
              name="profileImage"
              placeholder="https://example.com/profile.jpg"
              icon={<Image className="w-4 h-4" />}
            />

            <InputField
              label="Background Image URL"
              name="backgroundImage"
              placeholder="https://example.com/background.jpg"
              icon={<Image className="w-4 h-4" />}
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
          //  disabled={isLoading}
          className="w-full"
          //  loading={isLoading}
          loadingIcTe={"Creating account..."}
        >
          Create Account
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateAdminModal;
