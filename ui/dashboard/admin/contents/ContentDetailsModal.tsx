"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { FileText, Clock, Lock, Unlock, Hash, Video } from "lucide-react";

interface ContentDetailsModalProps { data: any; }

const ContentDetailsModal = ({ data }: ContentDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["contentDetails"]);
  if (!data) return null;
  const items = [
    { label: "Title", value: data.title, icon: <FileText className="w-4 h-4 text-cyan-400" /> },
    { label: "Type", value: data.contentType, icon: <Video className="w-4 h-4 text-cyan-400" /> },
    { label: "Duration", value: data.duration ? `${data.duration} min` : "N/A", icon: <Clock className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.isLocked ? "Locked" : "Unlocked", icon: data.isLocked ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-green-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("contentDetails"))} title="Content Details">
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

export default ContentDetailsModal;
