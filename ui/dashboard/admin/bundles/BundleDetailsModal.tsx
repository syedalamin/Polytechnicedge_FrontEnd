"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { BookMarked, DollarSign, FileText } from "lucide-react";

interface BundleDetailsModalProps { data: any; }

const BundleDetailsModal = ({ data }: BundleDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["bundleDetails"]);
  if (!data) return null;
  const items = [
    { label: "Title", value: data.title, icon: <BookMarked className="w-4 h-4 text-cyan-400" /> },
    { label: "Price", value: `$${data.price}`, icon: <DollarSign className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.isPublished ? "Published" : "Draft", icon: <FileText className="w-4 h-4 text-cyan-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("bundleDetails"))} title="Bundle Details">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.icon}<div><Text variant="caption" color="dimmed" size="sm">{item.label}</Text><Text variant="body" color="white" size="sm">{item.value}</Text></div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default BundleDetailsModal;
