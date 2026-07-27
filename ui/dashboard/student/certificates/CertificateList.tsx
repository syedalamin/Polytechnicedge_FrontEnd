"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useMeForAuth } from "@/services/graphql/user/userHook";
import { useCertificatesByUserId } from "@/services/graphql/certificates/certificateHook";
import { Award } from "lucide-react";

const CertificateList = () => {
  const { data: me } = useMeForAuth();
  const userId = me?.id || "";
  const { certificates: certData, loading } = useCertificatesByUserId(userId);

  const list = Array.isArray(certData) ? certData : [];

  const columns: TableColumn<any>[] = [
    {
      header: "Course",
      className: "pl-6 min-w-0",
      accessor: (c) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-white" />
          </div>
          <Text variant="body" color="white" size="sm" className="font-medium truncate">{c.course?.title || "N/A"}</Text>
        </div>
      ),
    },
    {
      header: "Issued At",
      className: "px-4",
      accessor: (c) => (
        <Text variant="body" color="dimmed" size="sm">
          {c.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">My Certificates</Text>
      </div>
      <GridTable
        data={list}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1.5fr]"
        isLoading={loading}
      />
    </GlassCard>
  );
};
export default CertificateList;
