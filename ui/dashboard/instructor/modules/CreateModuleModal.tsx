"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { Layers, Clock, Hash } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { moduleSchema } from "@/zodSchemas/module/moduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateModuleMutation } from "@/services/redux/api/modules/moduleApi";

interface CreateModuleModalProps {
  refetch: () => void;
  courseId: string;
}
type ModuleFormData = z.infer<typeof moduleSchema.createModuleSchema>;

const CreateModuleModal = ({ refetch, courseId }: CreateModuleModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addModule"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createModule, { isLoading }] = useCreateModuleMutation();

  const onSubmit = async (data: ModuleFormData) => {
    try {
      const res = await createModule({ ...data, courseId }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("addModule"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create module";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("addModule"))}
      title="Create Module"
      modalSize="md"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(moduleSchema.createModuleSchema) as any}
        defaultValues={{
          title: "",
          weekNumber: 1,
          estimatedDuration: 30,
          textInstruction: "",
        }}
      >
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <InputField
            label="Module Title"
            name="title"
            placeholder="e.g. Introduction to HTML"
            icon={<Layers className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Week Number"
              name="weekNumber"
              type="number"
              placeholder="1"
              icon={<Hash className="w-4 h-4" />}
            />
            <InputField
              label="Duration (min)"
              name="estimatedDuration"
              type="number"
              placeholder="30"
              icon={<Clock className="w-4 h-4" />}
            />
          </div>
          <TextareaField
            label="Instructions"
            name="textInstruction"
            placeholder="Instructions for this module"
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
          Create Module
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateModuleModal;
