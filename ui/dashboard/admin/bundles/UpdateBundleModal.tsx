"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { BookMarked, DollarSign } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { bundleSchema } from "@/zodSchemas/bundle/bundleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBundleMutation } from "@/services/redux/api/modules/bundleApi";

interface UpdateBundleModalProps { refetch: () => void; updateData: any; }
type BundleFormData = z.infer<typeof bundleSchema.updateBundleSchema>;

const UpdateBundleModal = ({ refetch, updateData }: UpdateBundleModalProps) => {
  const dispatch = useAppDispatch();
  const [updateBundle, { isLoading }] = useUpdateBundleMutation();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["updateBundle"]);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: BundleFormData) => {
    try {
      const id = updateData?.id;
      if (!id) { toast.error("Bundle ID not found"); return; }
      const res = await updateBundle({ id, data }).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("updateBundle")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update bundle";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("updateBundle"))} title="Update Bundle" modalSize="md">
      <Form onSubmit={onSubmit}         resolver={zodResolver(bundleSchema.updateBundleSchema) as any} values={{ title: updateData?.title || "", description: updateData?.description || "", price: updateData?.price || 0 }}>
        <div className="space-y-4">
          <InputField label="Bundle Title" name="title" icon={<BookMarked className="w-4 h-4" />} />
          <InputField label="Price ($)" name="price" type="number" icon={<DollarSign className="w-4 h-4" />} />
          <TextareaField label="Description" name="description" />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Update Bundle</Button>
      </Form>
    </Modal>
  );
};
export default UpdateBundleModal;
