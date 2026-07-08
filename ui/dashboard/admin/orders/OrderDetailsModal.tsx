"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { ShoppingCart, DollarSign, User, Calendar } from "lucide-react";

interface OrderDetailsModalProps { data: any; }

const OrderDetailsModal = ({ data }: OrderDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["orderDetails"]);
  if (!data) return null;
  const items = [
    { label: "Order ID", value: data.id, icon: <ShoppingCart className="w-4 h-4 text-cyan-400" /> },
    { label: "Amount", value: `$${data.totalAmount}`, icon: <DollarSign className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.status, icon: <ShoppingCart className="w-4 h-4 text-cyan-400" /> },
    { label: "User", value: data.user?.email || "N/A", icon: <User className="w-4 h-4 text-cyan-400" /> },
    { label: "Date", value: new Date(data.createdAt).toLocaleString(), icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
  ];
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("orderDetails"))} title="Order Details">
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.icon}<div><Text variant="caption" color="dimmed" size="sm">{item.label}</Text><Text variant="body" color="white" size="sm">{item.value}</Text></div>
          </div>
        ))}
        {data.items?.length > 0 && (
          <div>
            <Text variant="caption" color="dimmed" size="sm">Items</Text>
            {data.items.map((item: any, i: number) => (
              <Text key={i} variant="body" color="white" size="sm">• {item.course?.title || item.bundle?.title || "Item"} - ${item.price}</Text>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
export default OrderDetailsModal;
