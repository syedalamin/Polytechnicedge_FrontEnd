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
import { useCreateBundleMutation } from "@/services/redux/api/modules/bundleApi";

interface CreateBundleModalProps { refetch: () => void; }
type BundleFormData = z.infer<typeof bundleSchema.createBundleSchema>;

const CreateBundleModal = ({ refetch }: CreateBundleModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addBundle"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createBundle, { isLoading }] = useCreateBundleMutation();

  const onSubmit = async (data: BundleFormData) => {
    try {
      const res = await createBundle(data).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("addBundle")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create bundle";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("addBundle"))} title="Create Bundle" modalSize="md">
      <Form onSubmit={onSubmit}         resolver={zodResolver(bundleSchema.createBundleSchema) as any} defaultValues={{ title: "", description: "", price: 0 }}>
        <div className="space-y-4">
          <InputField label="Bundle Title" name="title" placeholder="e.g. Web Development Bundle" icon={<BookMarked className="w-4 h-4" />} />
          <InputField label="Price ($)" name="price" type="number" placeholder="0.00" icon={<DollarSign className="w-4 h-4" />} />
          <TextareaField label="Description" name="description" placeholder="Describe the bundle..." />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Create Bundle</Button>
      </Form>
    </Modal>
  );
};
export default CreateBundleModal;
