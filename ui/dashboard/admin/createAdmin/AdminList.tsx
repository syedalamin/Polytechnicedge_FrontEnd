"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, Globe, MoreVertical, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "@/components/common/Button";

interface AdminType {
  name: string;
  email: string;
  role: string;
  initials: string;
  status: string;
  lastActive: string;
  permissions: number;
  sessions: number;
}
const AdminList = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);

  const allAdmins: AdminType[] = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Super Admin",
      initials: "JD",
      status: "active",
      lastActive: "Now",
      permissions: 12,
      sessions: 3,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      initials: "JS",
      status: "active",
      lastActive: "5m ago",
      permissions: 8,
      sessions: 2,
    },

    {
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Admin",
      initials: "AB",
      status: "away",
      lastActive: "2h ago",
      permissions: 7,
      sessions: 1,
    },
  ];

  const statusConfig: Record<string, { dot: string; label: string }> = {
    active: { dot: "bg-emerald-400", label: "Active" },
    away: { dot: "bg-amber-400", label: "Away" },
    offline: { dot: "bg-gray-500", label: "Offline" },
  };

  const roleBadgeColors: Record<string, string> = {
    "Super Admin": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Admin: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Admin",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (admin) => (
        <>
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {admin.initials}
          </div>
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {admin.name}
            </Text>
            <Text variant="body" color="dimmed" size="sm" className="truncate">
              {admin.email}
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
          className={`text-xs px-2.5 py-1 rounded-full border ${roleBadgeColors[admin.role] || "bg-white/5 text-gray-300 border-white/10"}`}
        >
          {admin.role}
        </span>
      ),
    },
    {
      header: "Status",
      className: "px-4 flex items-center gap-2",
      accessor: (admin) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${(statusConfig[admin.status] || statusConfig.offline).dot}`}
          />
          <Text variant="body" color="dimmed" size="sm">
            {statusConfig[admin.status]?.label || "Offline"}
          </Text>
          <Text variant="body" color="dimmed" size="sm">
            · {admin.lastActive}
          </Text>
        </div>
      ),
    },
    {
      header: "Permissions",
      className: "px-4 flex items-center gap-2",
      accessor: (admin) => (
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-gray-500" />
          <Text variant="body" color="white" size="sm">
            {admin.permissions}
          </Text>
        </div>
      ),
    },
    {
      header: "Sessions",
      className: "px-4 flex items-center gap-2",
      accessor: (admin) => (
        <div className="flex items-center gap-2">
          <Globe
            className={`w-3.5 h-3.5 ${admin.sessions > 0 ? "text-emerald-400" : "text-gray-600"}`}
          />
          <Text
            variant="body"
            color={admin.sessions > 0 ? "white" : "dimmed"}
            size="sm"
          >
            {admin.sessions} {admin.sessions === 1 ? "session" : "sessions"}
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
            variant="remove"
            title="Remove"
            size="action"
            centerIcon={<Trash2 className="w-4 h-4" />}
          />

          <Button
            variant="more"
            title="More"
            size="action"
            centerIcon={<MoreVertical className="w-4 h-4" />}
            onClick={() => console.log(admin)}
          />
        </div>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <Text color="white" variant="body" size="md">
              All Administrators
            </Text>
          </div>
          <div>
            <Text color="dimmed" variant="caption" size="sm">
              {allAdmins.length} total
            </Text>
          </div>
        </div>
      </div>

      <GridTable
        data={allAdmins}
        columns={columns}
        rowKeyAccessor="email"
        gridLayoutClass="grid-cols-[2fr_1fr_1.2fr_1fr_1fr_1fr]"
        // onRowClick={(admin) => console.log("Clicked row:", admin)}
      />
    </GlassCard>
  );
};
export default AdminList;
