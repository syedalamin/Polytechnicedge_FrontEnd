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

import z from "zod";
import { noticeSchema } from "@/zodSchemas/notice/noticeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNoticeMutation } from "@/services/redux/api/modules/noticeApi";
import { useAllCourses } from "@/services/graphql";

import SelectField from "@/components/forms/SelectField";
import { toast } from "sonner";

interface CreateNoticeModalProps {
  refetch: () => void;
}
type NoticeFormData = z.infer<typeof noticeSchema.createNoticeSchema>;

const CreateNoticeModal = ({ refetch }: CreateNoticeModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addNotice"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createNotice, { isLoading }] = useCreateNoticeMutation();

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
      const res = await createNotice(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("addNotice"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create notice";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("addNotice"))}
      title="Create Notice"
      modalSize="md"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(noticeSchema.createNoticeSchema) as any}
        defaultValues={{ title: "", content: "", isGlobal: true, courseId: "" }}
      >
        <div className="space-y-4">
          <InputField
            label="Notice Title"
            name="title"
            placeholder="e.g. Class Schedule Update"
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
          <TextareaField
            label="Content"
            name="content"
            placeholder="Write notice content..."
          />
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
          loadingIcTe={"Creating Notice..."}
        >
          Create Notice
        </Button>
      </Form>
    </Modal>
  );
};
export default CreateNoticeModal;
