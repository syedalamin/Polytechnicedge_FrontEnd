"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { Bell, Globe } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { noticeSchema } from "@/zodSchemas/notice/noticeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNoticeMutation } from "@/services/redux/api/modules/noticeApi";

interface CreateNoticeModalProps { refetch: () => void; }
type NoticeFormData = z.infer<typeof noticeSchema.createNoticeSchema>;

const CreateNoticeModal = ({ refetch }: CreateNoticeModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addNotice"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createNotice, { isLoading }] = useCreateNoticeMutation();

  const onSubmit = async (data: NoticeFormData) => {
    try {
      const res = await createNotice(data).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("addNotice")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create notice";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("addNotice"))} title="Create Notice" modalSize="md">
      <Form onSubmit={onSubmit}         resolver={zodResolver(noticeSchema.createNoticeSchema) as any} defaultValues={{ title: "", content: "", isGlobal: true, courseId: "" }}>
        <div className="space-y-4">
          <InputField label="Notice Title" name="title" placeholder="e.g. Class Schedule Update" icon={<Bell className="w-4 h-4" />} />
          <TextareaField label="Content" name="content" placeholder="Write notice content..." />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Create Notice</Button>
      </Form>
    </Modal>
  );
};
export default CreateNoticeModal;
