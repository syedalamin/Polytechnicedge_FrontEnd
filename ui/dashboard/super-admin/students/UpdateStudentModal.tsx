"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import {
  User,
  MapPin,
  Phone,
  Smartphone,
  GraduationCap,
  Calendar,
  FileText,
  Image,
} from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import TextareaField from "@/components/forms/TextareaField";
import z from "zod";
import { studentSchema } from "@/zodSchemas/student/studentSchema";
import SelectField from "@/components/forms/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateStudentMutation } from "@/services/redux/api/modules/studentApi";
import TagInputField from "@/components/forms/TagInputField";

interface UpdateStudentModalProps {
  refetch: () => void;
  updateData: any;
}
type StudentUpdateFormData = z.infer<
  typeof studentSchema.updateStudentSchema
>;

const UpdateStudentModal = ({
  refetch,
  updateData,
}: UpdateStudentModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["updateStudent"],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();

  const onSubmit = async (data: StudentUpdateFormData) => {
    try {
      const res = await updateStudent({ id: updateData.id, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("updateStudent"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update student";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("updateStudent"))}
      title="Update Student"
      modalSize="lg"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(studentSchema.updateStudentSchema) as any}
        values={{
          firstName: updateData.firstName || "",
          middleName: updateData.middleName || "",
          lastName: updateData.lastName || "",
          gender: updateData.gender || "",
          profileImage: updateData.profileImage || "",
          backgroundImage: updateData.backgroundImage || "",
          contactNumber1: updateData.contactNumber1 || "",
          contactNumber2: updateData.contactNumber2 || "",
          address: updateData.address || "",
          educationLevel: updateData.educationLevel || "",
          dateOfBirth: updateData.dateOfBirth
            ? new Date(updateData.dateOfBirth).toISOString().split("T")[0]
            : "",
          interests: updateData.interests || [],
          bio: updateData.bio || "",
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
              label="Education Level"
              name="educationLevel"
              placeholder="e.g. Diploma in CSE"
              icon={<GraduationCap className="w-4 h-4" />}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Contact Number 1"
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
              icon={<Smartphone className="w-4 h-4" />}
            />
          </div>
          <InputField
            label="Address"
            name="address"
            placeholder="Your address"
            icon={<MapPin className="w-4 h-4" />}
          />
          <TagInputField
            label="Interests (Type & press Enter or Comma)"
            name="interests"
            placeholder="e.g. Programming, AI, Networking"
            icon={<GraduationCap className="w-4 h-4" />}
          />
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
          disabled={isLoading}
          className="w-full mt-4"
          loading={isLoading}
        >
          Update Student
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateStudentModal;
