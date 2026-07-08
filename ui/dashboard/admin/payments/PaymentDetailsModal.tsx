"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { CreditCard, DollarSign, User, Calendar, Hash } from "lucide-react";

interface PaymentDetailsModalProps { data: any; }

const PaymentDetailsModal = ({ data }: PaymentDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["paymentDetails"]);
  if (!data) return null;
  const items = [
    { label: "Transaction ID", value: data.transactionId, icon: <Hash className="w-4 h-4 text-cyan-400" /> },
    { label: "Amount", value: `$${data.amount}`, icon: <DollarSign className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.status, icon: <CreditCard className="w-4 h-4 text-cyan-400" /> },
    { label: "User", value: data.user?.email || "N/A", icon: <User className="w-4 h-4 text-cyan-400" /> },
    { label: "Date", value: new Date(data.createdAt).toLocaleString(), icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("paymentDetails"))} title="Payment Details">
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.icon}<div><Text variant="caption" color="dimmed" size="sm">{item.label}</Text><Text variant="body" color="white" size="sm">{item.value}</Text></div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default PaymentDetailsModal;
