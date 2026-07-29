"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, BookMarked, EyeOff, Eye } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllBundles } from "@/services/graphql/bundles/bundleHook";
import { useState } from "react";
import CreateBundleModal from "./CreateBundleModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateBundleModal from "./UpdateBundleModal";
import BundleDetailsModal from "./BundleDetailsModal";
import { useUpdateBundleMutation } from "@/services/redux/api/modules/bundleApi";
import { toast } from "sonner";

const BundleList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [updateData, setUpdateData] = useState<any>({});
  const [detailData, setDetailData] = useState<any>({});
  const { bundles, meta, loading, refetch } = useAllBundles({}, page, limit);

  const [updateBundle, { isLoading }] = useUpdateBundleMutation();

  const handleTogglePublish = async (bundle: any) => {
    const id = bundle?.id;

    

    try {
      if (!id) {
        toast.error("Bundle ID not found");
        return;
      }
      const res = await updateBundle({
        id,
        data: { isPublished: !bundle.isPublished },
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        refetch();
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update bundle";

      toast.error(errorMsg);
    }
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Title",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (b) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            <BookMarked className="w-4 h-4" />
          </div>
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {b.title}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      className: "px-4",
      accessor: (b) => (
        <Text variant="body" color="white" size="sm">
          ${b.price}
        </Text>
      ),
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (b) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${b.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
        >
          {b.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },

    {
      header: "Courses",
      className: "px-4",
      accessor: (b) => (
        <Text variant="body" color="dimmed" size="sm">
          {b.items?.length || 0}
        </Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (b) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="edit"
            title={b.isPublished ? "Unpublish" : "Publish"}
            size="action"
            onClick={(e: any) => {
              e.stopPropagation();
              handleTogglePublish(b);
            }}
            centerIcon={
              b.isPublished ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
          />
          <Button
            variant="edit"
            title="Edit"
            size="action"
            onClick={() => {
              dispatch(openModal("updateBundle"));
              setUpdateData(b);
            }}
            centerIcon={<Edit className="w-4 h-4" />}
          />
          <Button
            variant="more"
            title="Details"
            size="action"
            onClick={() => {
              dispatch(openModal("bundleDetails"));
              setDetailData(b);
            }}
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
          <Text color="white" variant="body" size="md">
            All Bundles
          </Text>
        </div>
        <GridTable
          data={bundles}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1fr_1fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page}
          totalPages={meta?.totalPages}
          onPageChange={setPage}
        />
      </GlassCard>
      <CreateBundleModal refetch={refetch} />
      <UpdateBundleModal refetch={refetch} updateData={updateData} />
      <BundleDetailsModal data={detailData} />
    </>
  );
};
export default BundleList;
