"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { FileQuestion, Clock, Hash, Lock, Unlock } from "lucide-react";

interface QuizDetailsModalProps { data: any; }

const QuizDetailsModal = ({ data }: QuizDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["quizDetails"]);
  if (!data) return null;
  const items = [
    { label: "Title", value: data.title, icon: <FileQuestion className="w-4 h-4 text-cyan-400" /> },
    { label: "Time Limit", value: `${data.timeLimit} min`, icon: <Clock className="w-4 h-4 text-cyan-400" /> },
    { label: "Pass Score", value: data.passingScore, icon: <Hash className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.isLocked ? "Locked" : "Unlocked", icon: data.isLocked ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-green-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("quizDetails"))} title="Quiz Details">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.icon}
            <div><Text variant="caption" color="dimmed" size="sm">{item.label}</Text><Text variant="body" color="white" size="sm">{item.value}</Text></div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default QuizDetailsModal;
