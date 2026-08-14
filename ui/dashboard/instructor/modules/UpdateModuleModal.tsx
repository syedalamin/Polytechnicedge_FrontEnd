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
import { useUpdateModuleMutation } from "@/services/redux/api/modules/moduleApi";

interface UpdateModuleModalProps {
  refetch: () => void;
  updateData: any;
}
type ModuleFormData = z.infer<typeof moduleSchema.updateModuleSchema>;

const UpdateModuleModal = ({ refetch, updateData }: UpdateModuleModalProps) => {
  const dispatch = useAppDispatch();
  const [updateModule, { isLoading }] = useUpdateModuleMutation();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["updateModule"]);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: ModuleFormData) => {
    try {
      const id = updateData?.id;
      if (!id) { toast.error("Module ID not found"); return; }
      const res = await updateModule({ id, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("updateModule"));
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update module";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("updateModule"))} title="Update Module" modalSize="md">
      <Form onSubmit={onSubmit}         resolver={zodResolver(moduleSchema.updateModuleSchema) as any} values={{ title: updateData?.title || "", weekNumber: updateData?.weekNumber || 1, estimatedDuration: updateData?.estimatedDuration || 30, textInstruction: updateData?.textInstruction || "" }}>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <InputField label="Module Title" name="title" icon={<Layers className="w-4 h-4" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Week Number" name="weekNumber" type="number" icon={<Hash className="w-4 h-4" />} />
            <InputField label="Duration (min)" name="estimatedDuration" type="number" icon={<Clock className="w-4 h-4" />} />
          </div>
          <TextareaField label="Instructions" name="textInstruction" />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Update Module</Button>
      </Form>
    </Modal>
  );
};

export default UpdateModuleModal;
