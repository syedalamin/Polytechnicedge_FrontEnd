"use client";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Image,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import TagInputField from "@/components/forms/TagInputField";
import TextareaField from "@/components/forms/TextareaField";
import Button from "@/components/common/Button";
import { instructorSchema } from "@/zodSchemas/instructor/instructorSchema";
import { useUpdateMe } from "@/services/graphql/user/userHook";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    firstName?: string;
    middleName?: string | null;
    lastName?: string;
    gender?: string | null;
    profileImage?: string | null;
    backgroundImage?: string | null;
    contactNumber1?: string | null;
    contactNumber2?: string | null;
    address?: string | null;
    bio?: string | null;
    expertise?: string[] | null;
    qualification?: string | null;
    linkedin?: string | null;
    website?: string | null;
    dateOfBirth?: string | null;
  } | null;
  onSuccess: () => void;
}

type MyProfileFormData = z.infer<typeof instructorSchema.updateMyProfileSchema>;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const UpdateProfileModal = ({
  isOpen,
  onClose,
  profile,
  onSuccess,
}: UpdateProfileModalProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { updateMe, loading } = useUpdateMe();

  const onSubmit = async (data: MyProfileFormData) => {
    try {
      const payload = { ...data };
      if (!payload.dateOfBirth) delete payload.dateOfBirth;
      const res = await updateMe({ instructorData: payload });
      if (res) {
        toast.success("Profile updated successfully");
        onSuccess();
        onClose();
      } else {
        const msg = "Failed to update profile";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to update profile";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  if (!isOpen) return null;

  const dob = profile?.dateOfBirth
    ? new Date(profile.dateOfBirth).toISOString().slice(0, 10)
    : "";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update My Profile"
      modalSize="lg"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(instructorSchema.updateMyProfileSchema)}
        values={{
          firstName: profile?.firstName || "",
          middleName: profile?.middleName || "",
          lastName: profile?.lastName || "",
          gender: profile?.gender || "",
          profileImage: profile?.profileImage || "",
          backgroundImage: profile?.backgroundImage || "",
          contactNumber1: profile?.contactNumber1 || "",
          contactNumber2: profile?.contactNumber2 || "",
          address: profile?.address || "",
          bio: profile?.bio || "",
          expertise: profile?.expertise || [],
          qualification: profile?.qualification || "",
          linkedin: profile?.linkedin || "",
          website: profile?.website || "",
          dateOfBirth: dob,
        }}
      >
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="First Name"
              name="firstName"
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
              placeholder="Doe"
              icon={<User className="w-4 h-4" />}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="Contact Number"
              name="contactNumber1"
              type="tel"
              placeholder="+1234567890"
              icon={<Phone className="w-4 h-4" />}
            />
            <InputField
              label="Contact Number 2"
              name="contactNumber2"
              type="tel"
              placeholder="+1234567890"
              icon={<Phone className="w-4 h-4" />}
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Address"
              name="address"
              placeholder="Your address"
              icon={<MapPin className="w-4 h-4" />}
            />
            <InputField
              label="Qualification"
              name="qualification"
              placeholder="e.g. PhD in Computer Science"
              icon={<GraduationCap className="w-4 h-4" />}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TagInputField
              label="Expertise (Type & press Enter or Comma)"
              name="expertise"
              placeholder="e.g. React, Node, C"
              icon={<GraduationCap className="w-4 h-4" />}
            />
            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="LinkedIn URL"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                icon={<ExternalLink className="w-4 h-4" />}
              />
              <InputField
                label="Website URL"
                name="website"
                placeholder="https://example.com"
                icon={<Globe className="w-4 h-4" />}
              />
            </div>
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
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4"
          loading={loading}
        >
          Update Profile
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateProfileModal;
