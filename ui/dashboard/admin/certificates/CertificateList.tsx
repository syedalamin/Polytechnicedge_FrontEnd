"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { MoreVertical, Award } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllCertificates } from "@/services/graphql/certificates/certificateHook";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import CertificateDetailsModal from "./CertificateDetailsModal";

const CertificateList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [detailData, setDetailData] = useState({});
  const { certificates, meta, loading } = useAllCertificates({}, page, limit);

  const columns: TableColumn<any>[] = [
    { header: "Student", className: "pl-6", accessor: (c) => <Text variant="body" color="white" size="sm">{c.user?.email || "N/A"}</Text> },
    { header: "Course", className: "px-4 min-w-0", accessor: (c) => <Text variant="body" color="dimmed" size="sm" className="truncate">{c.course?.title || "N/A"}</Text> },
    { header: "Issued At", className: "px-4", accessor: (c) => <Text variant="body" color="dimmed" size="sm">{new Date(c.issuedAt).toLocaleDateString()}</Text> },
    { header: "Actions", className: "pr-6 text-right", accessor: (c) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("certificateDetails")); setDetailData(c); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
      </div>
    )},
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Certificates</Text></div>
        <GridTable data={certificates} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[1.5fr_2fr_1.5fr_auto]" isLoading={loading} currentPage={meta?.page} totalPages={meta?.totalPages} onPageChange={setPage} />
      </GlassCard>
      <CertificateDetailsModal data={detailData} />
    </>
  );
};
export default CertificateList;
