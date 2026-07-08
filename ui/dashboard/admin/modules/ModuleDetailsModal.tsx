"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { Layers, Clock, Hash, BookOpen, FileQuestion } from "lucide-react";

interface ModuleDetailsModalProps { data: any; }

const ModuleDetailsModal = ({ data }: ModuleDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["moduleDetails"]);
  if (!data) return null;
  const items = [
    { label: "Title", value: data.title, icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { label: "Week", value: `Week ${data.weekNumber}`, icon: <Hash className="w-4 h-4 text-cyan-400" /> },
    { label: "Duration", value: `${data.estimatedDuration} min`, icon: <Clock className="w-4 h-4 text-cyan-400" /> },
    { label: "Contents", value: data.contents?.length || 0, icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Quizzes", value: data.quizzes?.length || 0, icon: <FileQuestion className="w-4 h-4 text-cyan-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("moduleDetails"))} title="Module Details">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.icon}
              <div><Text variant="caption" color="dimmed" size="sm">{item.label}</Text><Text variant="body" color="white" size="sm">{item.value}</Text></div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModuleDetailsModal;
