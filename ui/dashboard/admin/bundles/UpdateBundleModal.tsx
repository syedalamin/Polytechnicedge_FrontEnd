"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { BookMarked, BookOpen } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { bundleSchema } from "@/zodSchemas/bundle/bundleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBundleMutation } from "@/services/redux/api/modules/bundleApi";
import { useAllCourses } from "@/services/graphql";
import SelectTagField from "@/components/forms/SelectTagField";

interface UpdateBundleModalProps {
  refetch: () => void;
  updateData: any;
}
type BundleFormData = z.infer<typeof bundleSchema.updateBundleSchema>;

const UpdateBundleModal = ({ refetch, updateData }: UpdateBundleModalProps) => {
  const dispatch = useAppDispatch();
  const [updateBundle, { isLoading }] = useUpdateBundleMutation();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["updateBundle"],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { courses } = useAllCourses({}, 1, 100);


  const categoryOptions =
    courses?.map((cou: any) => ({
      value: String(cou.id),
      label: cou.title,
    })) || [];


  const existingItemsOptions =
    updateData?.items?.map((item: any) => {
      const targetId = item.courseId || item.id;
      const matchedCourse = courses?.find(
        (cou: any) => String(cou.id) === String(targetId),
      );
      return {
        value: String(targetId),
        label: matchedCourse?.title || item.title || "Unknown Course",
      };
    }) || [];

const onSubmit = async (data: BundleFormData) => {

  const cleanedItems = data.items?.filter(
    (item) => !data.removeItems?.includes(item.courseId),
  );


  const payload = {
    ...data,
    items: cleanedItems,
  
    removeItems:
      data.removeItems && data.removeItems.length > 0
        ? data.removeItems
        : undefined,
  };


  try {
    const id = updateData?.id;
    if (!id) {
      toast.error("Bundle ID not found");
      return;
    }
    const res = await updateBundle({ id, data: payload }).unwrap();
    if (res?.success) {
      toast.success(res?.message);
      refetch();
      dispatch(closeModal("updateBundle"));
    }
  } catch (err: any) {
    const errorMsg = err?.data?.message || "Failed to update bundle";
    setErrorMessage(errorMsg);
    toast.error(errorMsg);
  }
};

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("updateBundle"))}
      title="Update Bundle"
      modalSize="md"
    >
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(bundleSchema.updateBundleSchema) as any}
        values={{
          title: updateData?.title || "",
          description: updateData?.description || "",

          items:
            updateData?.items?.map((item: any) => ({
              courseId: item.courseId || item.id,
            })) || [],

          removeItems: [],
        }}
      >
        <div className="space-y-4 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="space-y-4">
            <InputField
              label="Bundle Title"
              name="title"
              placeholder="e.g. Web Development Bundle"
              icon={<BookMarked className="w-4 h-4" />}
            />

            {/* নতুন কোর্স যোগ করার ফিল্ড */}
            <SelectTagField
              label="Course Add"
              name="items"
              options={categoryOptions}
              placeholder="Select course to add"
              icon={<BookOpen className="w-4 h-4" />}
            />

            {/* পুরোনো কোর্স থেকে রিমুভ বা ডিলিট করার ফিল্ড (এখানে valueType="string" দিতে হবে) */}
            <SelectTagField
              label="Course Delete"
              name="removeItems"
              options={existingItemsOptions}
              placeholder="Select course to remove"
              icon={<BookOpen className="w-4 h-4" />}
              valueType="string"
            />

            <TextareaField
              label="Description"
              name="description"
              placeholder="Describe the bundle..."
            />
          </div>
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
          Update Bundle
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateBundleModal;
