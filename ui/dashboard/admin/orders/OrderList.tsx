"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { MoreVertical } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllOrders } from "@/services/graphql/orders/orderHook";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import OrderDetailsModal from "./OrderDetailsModal";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400",
  PAID: "bg-green-500/20 text-green-400",
  FAILED: "bg-red-500/20 text-red-400",
  CANCELLED: "bg-gray-500/20 text-gray-400",
  REFUNDED: "bg-blue-500/20 text-blue-400",
};

const OrderList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [detailData, setDetailData] = useState({});
  const { orders, meta, loading } = useAllOrders({}, page, limit);

  const columns: TableColumn<any>[] = [
    { header: "Order ID", className: "pl-6", accessor: (o) => <Text variant="body" color="white" size="sm" className="font-mono">#{o.id?.substring(0, 8)}</Text> },
    { header: "User", className: "px-4", accessor: (o) => <Text variant="body" color="dimmed" size="sm">{o.user?.email || "N/A"}</Text> },
    { header: "Amount", className: "px-4", accessor: (o) => <Text variant="body" color="white" size="sm">${o.totalAmount}</Text> },
    { header: "Status", className: "px-4", accessor: (o) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[o.status] || "bg-gray-500/20 text-gray-400"}`}>{o.status}</span>
    )},
    { header: "Date", className: "px-4", accessor: (o) => <Text variant="body" color="dimmed" size="sm">{new Date(o.createdAt).toLocaleDateString()}</Text> },
    { header: "Actions", className: "pr-6 text-right", accessor: (o) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("orderDetails")); setDetailData(o); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
      </div>
    )},
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Orders</Text></div>
        <GridTable data={orders} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto]" isLoading={loading} currentPage={meta?.page} totalPages={meta?.totalPages} onPageChange={setPage} />
      </GlassCard>
      <OrderDetailsModal data={detailData} />
    </>
  );
};
export default OrderList;
