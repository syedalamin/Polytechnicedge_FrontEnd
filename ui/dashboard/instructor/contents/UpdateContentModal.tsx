"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import TextareaField from "@/components/forms/TextareaField";
import { FileText, Clock } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { contentSchema } from "@/zodSchemas/content/contentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateContentMutation } from "@/services/redux/api/modules/contentApi";

interface UpdateContentModalProps { refetch: () => void; updateData: any; }
type ContentFormData = z.infer<typeof contentSchema.updateContentSchema>;

const UpdateContentModal = ({ refetch, updateData }: UpdateContentModalProps) => {
  const dispatch = useAppDispatch();
  const [updateContent, { isLoading }] = useUpdateContentMutation();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["updateContent"]);
  const [errorMessage, setErrorMessage] = useState("");

  const contentTypeOptions = [
    { value: "VIDEO", label: "Video" }, { value: "TEXT", label: "Text" },
    { value: "PDF", label: "PDF" }, { value: "AUDIO", label: "Audio" },
    { value: "EXTERNAL_LINK", label: "External Link" }, { value: "INTERACTIVE", label: "Interactive" },
  ];

  const onSubmit = async (data: ContentFormData) => {
    try {
      const id = updateData?.id;
      if (!id) { toast.error("Content ID not found"); return; }
      const res = await updateContent({ id, data }).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("updateContent")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update content";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("updateContent"))} title="Update Content" modalSize="md">
      <Form onSubmit={onSubmit}         resolver={zodResolver(contentSchema.updateContentSchema) as any} values={{ title: updateData?.title || "", contentType: updateData?.contentType || "VIDEO", contentUrl: updateData?.contentUrl || "", textContent: updateData?.textContent || "", duration: updateData?.duration || 0 }}>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <InputField label="Title" name="title" icon={<FileText className="w-4 h-4" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField label="Content Type" name="contentType" options={contentTypeOptions} />
            <InputField label="Duration (min)" name="duration" type="number" icon={<Clock className="w-4 h-4" />} />
          </div>
          <InputField label="Content URL" name="contentUrl" />
          <TextareaField label="Text Content" name="textContent" />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Update Content</Button>
      </Form>
    </Modal>
  );
};

export default UpdateContentModal;
