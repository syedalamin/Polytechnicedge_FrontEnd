"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import TextareaField from "@/components/forms/TextareaField";
import { FileText, Clock, Lock } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { contentSchema } from "@/zodSchemas/content/contentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContentMutation } from "@/services/redux/api/modules/contentApi";

interface CreateContentModalProps {
  refetch: () => void;
  moduleId: string;
}
type ContentFormData = z.infer<typeof contentSchema.createContentSchema>;

const CreateContentModal = ({ refetch, moduleId }: CreateContentModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addContent"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createContent, { isLoading }] = useCreateContentMutation();

  const contentTypeOptions = [
    { value: "VIDEO", label: "Video" },
    { value: "TEXT", label: "Text" },
    { value: "PDF", label: "PDF" },
    { value: "AUDIO", label: "Audio" },
    { value: "EXTERNAL_LINK", label: "External Link" },
    { value: "INTERACTIVE", label: "Interactive" },
  ];

  const onSubmit = async (data: ContentFormData) => {
    try {
      const res = await createContent({ ...data, moduleId }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("addContent"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create content";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("addContent"))}
      title="Create Content"
      modalSize="md"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(contentSchema.createContentSchema) as any}
        defaultValues={{
          title: "",
          contentType: "VIDEO",
          contentUrl: "",
          textContent: "",
          duration: 1,
          isLocked: true,
        }}
      >
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <InputField
            label="Content Title"
            name="title"
            placeholder="e.g. Introduction Video"
            icon={<FileText className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Content Type"
              name="contentType"
              options={contentTypeOptions}
              placeholder="Select type"
            />
            <InputField
              label="Duration (min)"
              name="duration"
              type="number"
              icon={<Clock className="w-4 h-4" />}
            />
          </div>
          <InputField
            label="Content URL"
            name="contentUrl"
            placeholder="https://..."
          />
          <SelectField
            label="Lock Status"
            name="isLocked"
            options={[
              { value: "true", label: "Locked" },
              { value: "false", label: "Unlocked" },
            ]}
            placeholder="Select lock status"
            icon={<Lock className="w-4 h-4" />}
          />
          <TextareaField
            label="Text Content"
            name="textContent"
            placeholder="Write text content here..."
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
        >
          Create Content
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateContentModal;
