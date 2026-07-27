"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useMeForAuth } from "@/services/graphql/user/userHook";
import { usePaymentsByUserId } from "@/services/graphql/payments/paymentHook";
import { CreditCard } from "lucide-react";

const statusColors: Record<string, string> = {
  SUCCESS: "bg-green-500/20 text-green-400",
  PENDING: "bg-yellow-500/20 text-yellow-400",
  FAILED: "bg-red-500/20 text-red-400",
  REFUNDED: "bg-blue-500/20 text-blue-400",
};

const PaymentList = () => {
  const { data: me } = useMeForAuth();
  const userId = me?.id || "";
  const { payments, loading } = usePaymentsByUserId(userId);

  const list = Array.isArray(payments) ? payments : [];

  const columns: TableColumn<any>[] = [
    {
      header: "Transaction ID",
      className: "pl-6",
      accessor: (p) => <Text variant="body" color="white" size="sm" className="font-mono">{p.transactionId || "N/A"}</Text>,
    },
    {
      header: "Amount",
      className: "px-4",
      accessor: (p) => <Text variant="body" color="white" size="sm">${p.amount}</Text>,
    },
    {
      header: "Method",
      className: "px-4",
      accessor: (p) => <Text variant="body" color="dimmed" size="sm">{p.paymentMethod || "N/A"}</Text>,
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (p) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[p.status] || "bg-gray-500/20 text-gray-400"}`}>
          {p.status}
        </span>
      ),
    },
    {
      header: "Date",
      className: "px-4",
      accessor: (p) => (
        <Text variant="body" color="dimmed" size="sm">
          {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">My Payments</Text>
      </div>
      <GridTable
        data={list}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]"
        isLoading={loading}
      />
    </GlassCard>
  );
};
export default PaymentList;
