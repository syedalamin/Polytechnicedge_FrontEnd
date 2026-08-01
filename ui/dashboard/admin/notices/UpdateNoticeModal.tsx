"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { Bell, BookOpen, Globe } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { noticeSchema } from "@/zodSchemas/notice/noticeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateNoticeMutation } from "@/services/redux/api/modules/noticeApi";
import SelectField from "@/components/forms/SelectField";
import { useAllCourses } from "@/services/graphql/courses/courseHook";

interface UpdateNoticeModalProps {
  refetch: () => void;
  updateData: any;
}
type NoticeFormData = z.infer<typeof noticeSchema.updateNoticeSchema>;

const UpdateNoticeModal = ({ refetch, updateData }: UpdateNoticeModalProps) => {
  const dispatch = useAppDispatch();
  const [updateNotice, { isLoading }] = useUpdateNoticeMutation();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["updateNotice"],
  );
  const [errorMessage, setErrorMessage] = useState("");

    const { courses } = useAllCourses({}, 1, 100);
    const courseOptions =
      courses?.map((cou: any) => ({
        value: cou.id,
        label: cou.title,
      })) || [];
  
    const isGlobalOptions = [
      { value: "true", label: "True" },
      { value: "false", label: "False" },
    ];

  const onSubmit = async (data: NoticeFormData) => {
    try {
      const id = updateData?.id;
      if (!id) {
        toast.error("Notice ID not found");
        return;
      }
      const res = await updateNotice({ id, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("updateNotice"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update notice";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("updateNotice"))}
      title="Update Notice"
      modalSize="md"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(noticeSchema.updateNoticeSchema) as any}
        values={{
          title: updateData?.title || "",
          content: updateData?.content || "",
          isGlobal: updateData?.isGlobal?.toString() || "true",
          courseId: updateData?.courseId || "",
        }}
      >
        <div className="space-y-4">
          <InputField
            label="Title"
            name="title"
            icon={<Bell className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Course"
              name="courseId"
              options={courseOptions}
              placeholder="Select Course"
              icon={<BookOpen className="w-4 h-4" />}
            />
            <SelectField
              label="Is Global"
              name="isGlobal"
              options={isGlobalOptions}
              placeholder="Select Option"
              icon={<Globe className="w-4 h-4" />}
            />
          </div>
          <TextareaField label="Content" name="content" />
        </div>
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}
        <Button
          disabled={isLoading}
          className="w-full mt-4"
          loading={isLoading}
        >
          Update Notice
        </Button>
      </Form>
    </Modal>
  );
};
export default UpdateNoticeModal;
