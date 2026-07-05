"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, Globe, MoreVertical, Shield, Trash2 } from "lucide-react";

import Button from "@/components/common/Button";
import { useAllAdmins } from "@/services/graphql/admin/adminHook";
import Image from "next/image";
import { useState } from "react";
import CreateAdminModal from "./CreateAdminModal";
 

const AdminList = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
 

  const { admins, meta, loading, refetch } = useAllAdmins(page, limit);

  const statusConfig: Record<string, { dot: string; label: string }> = {
    active: { dot: "bg-emerald-400", label: "Active" },
    away: { dot: "bg-amber-400", label: "Away" },
    offline: { dot: "bg-gray-500", label: "Offline" },
  };

  const roleBadgeColors: Record<string, string> = {
    SUPER_ADMIN: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Admin: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Admin",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (admin) => (
        <>
          {admin.profileImage ? (
            <Image
              alt="profileImage"
              src={admin.profileImage}
              width={100}
              height={100}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0"></div>
          )}
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {admin.firstName} {admin.lastName}
            </Text>
            <Text variant="body" color="dimmed" size="sm" className="truncate">
              {admin.user.email}
            </Text>
          </div>
        </>
      ),
    },
    {
      header: "Role",
      className: "px-4",
      accessor: (admin) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full border ${roleBadgeColors[admin.user.role] || "bg-white/5 text-gray-300 border-white/10"}`}
        >
          {admin.user.role}
        </span>
      ),
    },
    {
      header: "Status",
      className: "px-4 flex items-center gap-2",
      accessor: (admin) => (
        <Text variant="body" color="dimmed" size="sm">
          {statusConfig[admin.user.status]?.label || "Offline"}
        </Text>
      ),
    },

    {
      header: "Verify",
      className: "px-4 flex items-center gap-2",
      accessor: (admin) => (
        <div className="flex items-center gap-2">
          <Globe
            className={`w-3.5 h-3.5 ${admin.user.emailVerified > 0 ? "text-emerald-400" : "text-gray-600"}`}
          />
          <Text
            variant="body"
            color={admin.user.emailVerified > 0 ? "primary" : "dimmed"}
            size="sm"
          >
            {admin.user.emailVerified ? "Verified" : "Not Verified"}
          </Text>
        </div>
      ),
    },

    {
      header: "Contact",
      className: "px-4 flex items-center gap-2",
      accessor: (admin) => (
        <div className="flex items-center gap-2">
          <Text variant="body" color="dimmed" size="sm">
            {admin.contactNumber1 ? admin.contactNumber1 : "No Number"}
          </Text>
        </div>
      ),
    },

    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (admin) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="edit"
            title="Edit"
            size="action"
            centerIcon={<Edit className="w-4 h-4  " />}
          />

          

          <Button
            variant="more"
            title="More"
            size="action"
            centerIcon={<MoreVertical className="w-4 h-4" />}
          />
        </div>
      ),
    },
  ];

 

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Text color="white" variant="body" size="md">
                All Admin
              </Text>
            </div>
            <div>
              <Text color="dimmed" variant="caption" size="sm">
                {meta?.total} total
              </Text>
            </div>
          </div>
        </div>

        <GridTable
          data={admins}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
          // onRowClick={(admin) => console.log("Clicked row:", admin)}
        />
      </GlassCard>

      {/* Modal  */}
      <CreateAdminModal refetch={refetch} />
    </>
  );
};
export default AdminList;
