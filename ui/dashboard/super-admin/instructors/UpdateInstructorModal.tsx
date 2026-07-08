"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import { FileText, Image, Mail, MapPin, Phone, User, Globe, ExternalLink, GraduationCap, Briefcase } from "lucide-react";
import Button from "@/components/common/Button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import TextareaField from "@/components/forms/TextareaField";
import z from "zod";
import { instructorSchema } from "@/zodSchemas/instructor/instructorSchema";
import SelectField from "@/components/forms/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateInstructorMutation } from "@/services/redux/api/modules/instructorApi";

interface UpdateInstructorModalProps { refetch: () => void; updateData: any; }
type InstructorUpdateFormData = z.infer<typeof instructorSchema.updateInstructorSchema>;

const UpdateInstructorModal = ({ refetch, updateData }: UpdateInstructorModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["updateInstructor"]);
  const [errorMessage, setErrorMessage] = useState("");
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [updateInstructor, { isLoading }] = useUpdateInstructorMutation();

  const onSubmit = async (data: InstructorUpdateFormData) => {
    try {
      const res = await updateInstructor({ id: updateData.id, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("updateInstructor"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update instructor";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("updateInstructor"))} title="Update Instructor" modalSize="lg">
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(instructorSchema.updateInstructorSchema) as any}
        values={{
          firstName: updateData.firstName || "",
          middleName: updateData.middleName || "",
          lastName: updateData.lastName || "",
          gender: updateData.gender || "",
          profileImage: updateData.profileImage || "",
          backgroundImage: updateData.backgroundImage || "",
          contactNumber1: updateData.contactNumber1 || "",
          address: updateData.address || "",
          bio: updateData.bio || "",
          expertise: updateData.expertise?.join(", ") || "",
          qualification: updateData.qualification || "",
          experienceYears: updateData.experienceYears,
          linkedin: updateData.linkedin || "",
          website: updateData.website || "",
        }}
      >
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="First Name" name="firstName" placeholder="John" icon={<User className="w-4 h-4" />} />
            <InputField label="Middle Name" name="middleName" placeholder="Jane" icon={<User className="w-4 h-4" />} />
            <InputField label="Last Name" name="lastName" placeholder="Doe" icon={<User className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectField label="Gender" name="gender" options={genderOptions} placeholder="Select gender" />
            <InputField label="Profile Image URL" name="profileImage" placeholder="https://example.com/profile.jpg" icon={<Image className="w-4 h-4" />} />
            <InputField label="Background Image URL" name="backgroundImage" placeholder="https://example.com/background.jpg" icon={<Image className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Contact Number" name="contactNumber1" type="tel" placeholder="+1234567890" icon={<Phone className="w-4 h-4" />} />
            <InputField label="Address" name="address" placeholder="Your address" icon={<MapPin className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Expertise" name="expertise" placeholder="e.g. Mathematics, Physics" icon={<GraduationCap className="w-4 h-4" />} />
            <InputField label="Qualification" name="qualification" placeholder="e.g. PhD" icon={<GraduationCap className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Experience (years)" name="experienceYears" type="number" placeholder="5" icon={<Briefcase className="w-4 h-4" />} />
            <InputField label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/in/..." icon={<ExternalLink className="w-4 h-4" />} />
          </div>
          <InputField label="Website URL" name="website" placeholder="https://example.com" icon={<Globe className="w-4 h-4" />} />
          <TextareaField label="Bio" name="bio" placeholder="Tell us about yourself" icon={<FileText className="w-4 h-4" />} />
        </div>
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Update Instructor</Button>
      </Form>
    </Modal>
  );
};

export default UpdateInstructorModal;
