"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { MoreVertical } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";

const EnrollmentList = () => {
  const enrollments: any[] = [];

  const columns: TableColumn<any>[] = [
    { header: "Student", className: "pl-6", accessor: (e) => <Text variant="body" color="white" size="sm">{e.user?.email || "N/A"}</Text> },
    { header: "Course", className: "px-4 min-w-0", accessor: (e) => <Text variant="body" color="dimmed" size="sm" className="truncate">{e.course?.title || "N/A"}</Text> },
    { header: "Status", className: "px-4", accessor: (e) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${e.status === "ACTIVE" ? "bg-green-500/20 text-green-400" : e.status === "COMPLETED" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>
        {e.status || "N/A"}
      </span>
    )},
    { header: "Enrolled", className: "px-4", accessor: (e) => <Text variant="body" color="dimmed" size="sm">{e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString() : "N/A"}</Text> },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Enrollments</Text></div>
      <GridTable data={enrollments} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[1.5fr_2fr_1fr_1.5fr]" isLoading={false} />
    </GlassCard>
  );
};
export default EnrollmentList;
