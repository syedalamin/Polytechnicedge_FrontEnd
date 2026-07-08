"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { Video, Calendar, Clock, User, Link } from "lucide-react";

interface SessionDetailsModalProps { data: any; }

const SessionDetailsModal = ({ data }: SessionDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["sessionDetails"]);
  if (!data) return null;
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("sessionDetails"))} title="Session Details">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Video className="w-5 h-5 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Title</Text><Text variant="body" color="white" size="sm">{data.title}</Text></div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Date</Text><Text variant="body" color="white" size="sm">{data.startTime ? new Date(data.startTime).toLocaleString() : "N/A"}</Text></div>
        </div>
      </div>
    </Modal>
  );
};
export default SessionDetailsModal;
