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
import { useUpdateCategoryMutation } from "@/services/redux/api/modules/categoryApi";

interface UpdateCategoryModalProps {
  refetch: () => void;
  updateData: any;
}
type CategoryFormData = z.infer<typeof categorySchema.updateCategorySchema>;

const UpdateCategoryModal = ({ refetch, updateData }: UpdateCategoryModalProps) => {
  const dispatch = useAppDispatch();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const isCreateModalOpen = useAppSelector(
    (state: any) => !!state.modal?.["updateCategory"],
  );
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const categoryId = updateData?.id || updateData?._id;

      if (!categoryId) {
        toast.error("Category ID not found!");
        return;
      }
      const res = await updateCategory({ id: categoryId, data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
        dispatch(closeModal("updateCategory"));
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Failed to update category. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(closeModal("updateCategory"))}
      title="Update Category"
      modalSize="md"
      confirmLabel="Update Category"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(categorySchema.updateCategorySchema)}
        values={{
          name: updateData?.name || "",
          description: updateData?.description || "",
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
          loadingIcTe={"Updating category..."}
        >
          Update Category
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
