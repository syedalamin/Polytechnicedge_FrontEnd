"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import { Eye, EyeOff, FileText, Image, Lock, Mail, MapPin, Phone, User, Globe, ExternalLink, GraduationCap, Briefcase } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import TextareaField from "@/components/forms/TextareaField";
import z from "zod";
import { instructorSchema } from "@/zodSchemas/instructor/instructorSchema";
import SelectField from "@/components/forms/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInstructorMutation } from "@/services/redux/api/modules/instructorApi";

interface CreateInstructorModalProps { refetch: () => void; }
type InstructorFormData = z.infer<typeof instructorSchema.createInstructorSchema>;

const CreateInstructorModal = ({ refetch }: CreateInstructorModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addInstructor"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [createInstructor, { isLoading }] = useCreateInstructorMutation();

  const onSubmit = async (data: InstructorFormData) => {
    try {
      const res = await createInstructor(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("addInstructor"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || err?.data || "Failed to create instructor";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("addInstructor"))} title="Create Instructor" modalSize="lg">
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(instructorSchema.createInstructorSchema) as any}
        defaultValues={{
          firstName: "", lastName: "", middleName: "", email: "", password: "",
          gender: "", profileImage: "", backgroundImage: "", address: "",
          contactNumber1: "", bio: "", expertise: "", qualification: "",
          experienceYears: undefined, linkedin: "", website: "",
        }}
      >
        <div className="space-y-4 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="First Name" name="firstName" placeholder="John" icon={<User className="w-4 h-4" />} />
            <InputField label="Middle Name" name="middleName" placeholder="Jane" icon={<User className="w-4 h-4" />} />
            <InputField label="Last Name" name="lastName" placeholder="Doe" icon={<User className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Email" name="email" type="email" placeholder="instructor@example.com" icon={<Mail className="w-4 h-4" />} />
            <InputField label="Password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              rightIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />
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
            <InputField label="Qualification" name="qualification" placeholder="e.g. PhD in Computer Science" icon={<GraduationCap className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Experience (years)" name="experienceYears" type="number" placeholder="5" icon={<Briefcase className="w-4 h-4" />} />
            <InputField label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/in/..." icon={<ExternalLink className="w-4 h-4" />} />
          </div>
          <InputField label="Website URL" name="website" placeholder="https://example.com" icon={<Globe className="w-4 h-4" />} />
          <TextareaField label="Bio" name="bio" placeholder="Tell us about yourself" icon={<FileText className="w-4 h-4" />} />
        </div>
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Create Instructor</Button>
      </Form>
    </Modal>
  );
};

export default CreateInstructorModal;
