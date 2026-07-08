"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { BookOpen, FileText, Hash, Link } from "lucide-react";

interface CategoryDetailsModalProps {
  data: any;
}

const CategoryDetailsModal = ({ data }: CategoryDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["categoryDetails"],
  );

  if (!data) return null;

  const detailItems = [
    {
      label: "Name",
      value: data.name,
      icon: <Hash className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Slug",
      value: data.slug,
      icon: <Link className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Description",
      value: data.description || "No description",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Courses",
      value: data.courses?.length || 0,
      icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("categoryDetails"))}
      title="Category Details"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.icon}
              <div>
                <Text variant="caption" color="dimmed" size="sm">
                  {item.label}
                </Text>
                <Text variant="body" color="white" size="sm">
                  {item.value}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CategoryDetailsModal;
