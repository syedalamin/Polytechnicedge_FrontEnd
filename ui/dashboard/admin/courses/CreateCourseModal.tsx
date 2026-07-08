"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import TextareaField from "@/components/forms/TextareaField";
import { DollarSign, GraduationCap, BookOpen, Clock, Tag } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { courseSchema } from "@/zodSchemas/course/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCourseMutation } from "@/services/redux/api/modules/courseApi";
import { useAllCategory } from "@/services/graphql/category/categoryHook";

interface CreateCourseModalProps {
  refetch: () => void;
}
type CourseFormData = z.infer<typeof courseSchema.createCourseSchema>;

const CreateCourseModal = ({ refetch }: CreateCourseModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addCourse"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { categories } = useAllCategory(1, 100);

  const categoryOptions = categories?.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  })) || [];

  const levelOptions = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
    { value: "ALL_LEVELS", label: "All Levels" },
  ];

  const onSubmit = async (data: CourseFormData) => {
    try {
      const res = await createCourse(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("addCourse"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || err?.data || "Failed to create course";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("addCourse"))}
      title="Create Course"
      modalSize="lg"
      confirmLabel="Create Course"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(courseSchema.createCourseSchema) as any}
        defaultValues={{
          title: "",
          shortDescription: "",
          price: 0,
          categoryId: "",
          level: "ALL_LEVELS",
          accessExpiresInDays: 365,
        }}
      >
        <div className="space-y-4 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
          <InputField
            label="Course Title"
            name="title"
            placeholder="e.g. Web Development Bootcamp"
            icon={<GraduationCap className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Price ($)"
              name="price"
              type="number"
              placeholder="0.00"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <SelectField
              label="Level"
              name="level"
              options={levelOptions}
              placeholder="Select level"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Category"
              name="categoryId"
              options={categoryOptions}
              placeholder="Select category"
              icon={<BookOpen className="w-4 h-4" />}
            />
            <InputField
              label="Access (days)"
              name="accessExpiresInDays"
              type="number"
              placeholder="365"
              icon={<Clock className="w-4 h-4" />}
            />
          </div>
          <TextareaField
            label="Short Description"
            name="shortDescription"
            placeholder="Brief description of the course"
          />
        </div>

        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>
          Create Course
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateCourseModal;
