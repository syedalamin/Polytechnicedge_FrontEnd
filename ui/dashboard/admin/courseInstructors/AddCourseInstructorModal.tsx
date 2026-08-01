"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import SelectField from "@/components/forms/SelectField";
import { GraduationCap, Search } from "lucide-react";
import Button from "@/components/common/Button";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCreateCourseInstructorMutation } from "@/services/redux/api/modules/courseInstructorApi";
import { useAllInstructors } from "@/services/graphql/instructors/instructorHook";

interface AddCourseInstructorModalProps {
  refetch: () => void;
  courseId: string;
}

const AddCourseInstructorModal = ({
  refetch,
  courseId,
}: AddCourseInstructorModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["addCourseInstructor"],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { instructors, loading: instructorsLoading } = useAllInstructors(1, 100);
  const [createCourseInstructor, { isLoading }] =
    useCreateCourseInstructorMutation();

  const instructorOptions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return (
      instructors
        ?.filter((inst: any) => {
          if (!term) return true;
          const name = `${inst.firstName} ${inst.lastName}`.toLowerCase();
          return (
            name.includes(term) ||
            inst.user?.email?.toLowerCase().includes(term)
          );
        })
        .map((inst: any) => ({
          value: inst.id,
          label: `${inst.firstName} ${inst.lastName}${inst.user?.email ? ` (${inst.user.email})` : ""}`,
        })) || []
    );
  }, [instructors, searchTerm]);

  const onSubmit = async (data: { instructorId: string }) => {
    if (!data.instructorId) {
      setErrorMessage("Please select an instructor");
      toast.error("Please select an instructor");
      return;
    }

    try {
      const res = await createCourseInstructor({
        courseId,
        instructorId: data.instructorId,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Instructor assigned successfully");
        refetch();
        dispatch(closeModal("addCourseInstructor"));
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Failed to assign instructor";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("addCourseInstructor"))}
      title="Add Instructor to Course"
      modalSize="md"
    >
      <Form
        onSubmit={onSubmit}
        defaultValues={{ instructorId: "" }}
      >
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search instructors by name or email..."
              disabled={instructorsLoading}
              className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder-gray-500 text-sm"
            />
          </div>
          <SelectField
            label="Instructor"
            name="instructorId"
            options={instructorOptions}
            placeholder={
              instructorsLoading
                ? "Loading instructors..."
                : instructorOptions.length === 0
                  ? "No instructors match your search"
                  : "Select instructor"
            }
            icon={<GraduationCap className="w-4 h-4" />}
          />
        </div>
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}
        <Button
          disabled={isLoading || instructorsLoading}
          className="w-full mt-4"
          loading={isLoading}
        >
          Assign Instructor
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCourseInstructorModal;
