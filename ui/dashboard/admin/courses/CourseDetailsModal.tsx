"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { BookOpen, DollarSign, GraduationCap, Globe, Clock, Tag } from "lucide-react";

interface CourseDetailsModalProps {
  data: any;
}

const CourseDetailsModal = ({ data }: CourseDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["courseDetails"]);

  if (!data) return null;

  const items = [
    { label: "Title", value: data.title, icon: <GraduationCap className="w-4 h-4 text-cyan-400" /> },
    { label: "Slug", value: data.slug, icon: <Tag className="w-4 h-4 text-cyan-400" /> },
    { label: "Category", value: data.category?.name || "N/A", icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Price", value: `$${data.price}`, icon: <DollarSign className="w-4 h-4 text-cyan-400" /> },
    { label: "Level", value: data.level, icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { label: "Duration", value: data.durationHours ? `${data.durationHours}h` : "N/A", icon: <Clock className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.isPublished ? "Published" : "Draft", icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { label: "Modules", value: data.modules?.length || 0, icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("courseDetails"))} title="Course Details">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.icon}
              <div>
                <Text variant="caption" color="dimmed" size="sm">{item.label}</Text>
                <Text variant="body" color="white" size="sm">{item.value}</Text>
              </div>
            </div>
          ))}
        </div>
        {data.shortDescription && (
          <div>
            <Text variant="caption" color="dimmed" size="sm">Description</Text>
            <Text variant="body" color="white" size="sm">{data.shortDescription}</Text>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CourseDetailsModal;
