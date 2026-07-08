"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { Bell, Globe, Calendar, User } from "lucide-react";

interface NoticeDetailsModalProps { data: any; }

const NoticeDetailsModal = ({ data }: NoticeDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["noticeDetails"]);
  if (!data) return null;
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("noticeDetails"))} title="Notice Details">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Title</Text><Text variant="body" color="white" size="sm">{data.title}</Text></div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Scope</Text><Text variant="body" color="white" size="sm">{data.isGlobal ? "Global" : "Course Specific"}</Text></div>
        </div>
        <div>
          <Text variant="caption" color="dimmed" size="sm">Content</Text>
          <Text variant="body" color="white" size="sm" className="mt-1">{data.content}</Text>
        </div>
      </div>
    </Modal>
  );
};
export default NoticeDetailsModal;
