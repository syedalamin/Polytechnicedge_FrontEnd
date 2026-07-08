"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { MoreVertical } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllPayments } from "@/services/graphql/payments/paymentHook";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import PaymentDetailsModal from "./PaymentDetailsModal";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400",
  COMPLETED: "bg-green-500/20 text-green-400",
  FAILED: "bg-red-500/20 text-red-400",
  REFUNDED: "bg-blue-500/20 text-blue-400",
};

const PaymentList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [detailData, setDetailData] = useState({});
  const { payments, meta, loading } = useAllPayments({}, page, limit);

  const columns: TableColumn<any>[] = [
    { header: "Transaction", className: "pl-6", accessor: (p) => <Text variant="body" color="white" size="sm" className="font-mono">#{p.transactionId?.substring(0, 12)}</Text> },
    { header: "User", className: "px-4", accessor: (p) => <Text variant="body" color="dimmed" size="sm">{p.user?.email || "N/A"}</Text> },
    { header: "Amount", className: "px-4", accessor: (p) => <Text variant="body" color="white" size="sm">${p.amount}</Text> },
    { header: "Status", className: "px-4", accessor: (p) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[p.status] || "bg-gray-500/20 text-gray-400"}`}>{p.status}</span>
    )},
    { header: "Date", className: "px-4", accessor: (p) => <Text variant="body" color="dimmed" size="sm">{new Date(p.createdAt).toLocaleDateString()}</Text> },
    { header: "Actions", className: "pr-6 text-right", accessor: (p) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("paymentDetails")); setDetailData(p); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
      </div>
    )},
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Payments</Text></div>
        <GridTable data={payments} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_auto]" isLoading={loading} currentPage={meta?.page} totalPages={meta?.totalPages} onPageChange={setPage} />
      </GlassCard>
      <PaymentDetailsModal data={detailData} />
    </>
  );
};
export default PaymentList;
