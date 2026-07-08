"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { Award, User, BookOpen, Calendar, Link } from "lucide-react";

interface CertificateDetailsModalProps { data: any; }

const CertificateDetailsModal = ({ data }: CertificateDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["certificateDetails"]);
  if (!data) return null;
  const items = [
    { label: "Student", value: data.user?.email || "N/A", icon: <User className="w-4 h-4 text-cyan-400" /> },
    { label: "Course", value: data.course?.title || "N/A", icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Issued At", value: new Date(data.issuedAt).toLocaleString(), icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("certificateDetails"))} title="Certificate Details">
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.icon}<div><Text variant="caption" color="dimmed" size="sm">{item.label}</Text><Text variant="body" color="white" size="sm">{item.value}</Text></div>
          </div>
        ))}
        {data.certificateUrl && (
          <div className="flex items-center gap-3">
            <Link className="w-4 h-4 text-cyan-400" />
            <a href={data.certificateUrl} target="_blank" className="text-cyan-400 hover:underline text-sm">View Certificate</a>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default CertificateDetailsModal;
