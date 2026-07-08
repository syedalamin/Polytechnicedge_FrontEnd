"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import { FileText, Tag } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import TextareaField from "@/components/forms/TextareaField";
import z from "zod";
import { categorySchema } from "@/zodSchemas/category/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategoryMutation } from "@/services/redux/api/modules/categoryApi";

interface CreateCategoryModalProps {
  refetch: () => void;
}
type CategoryFormData = z.infer<typeof categorySchema.createCategorySchema>;

const CreateCategoryModal = ({ refetch }: CreateCategoryModalProps) => {
  const dispatch = useAppDispatch();

  const isCreateModalOpen = useAppSelector(
    (state: any) => !!state.modal?.["addCategory"],
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const res = await createCategory(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("addCategory"));
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Failed to create category. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(closeModal("addCategory"))}
      title="Create Category"
      modalSize="md"
      confirmLabel="Create Category"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(categorySchema.createCategorySchema)}
        defaultValues={{
          name: "",
          description: "",
        }}
      >
        <div className="space-y-4 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Category Name"
              name="name"
              registerOptions={{ required: "Category name is required" }}
              placeholder="e.g. Web Development"
              icon={<Tag className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <TextareaField
              label="Description"
              name="description"
              placeholder="Brief description of the category"
              icon={<FileText className="w-4 h-4" />}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <Button
          disabled={isLoading}
          className="w-full"
          loading={isLoading}
          loadingIcTe={"Creating category..."}
        >
          Create Category
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
