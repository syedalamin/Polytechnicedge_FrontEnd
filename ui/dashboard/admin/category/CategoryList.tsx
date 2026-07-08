"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, BookOpen } from "lucide-react";

import Button from "@/components/common/Button";
import { useAllCategory } from "@/services/graphql/category/categoryHook";
import { useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateCategoryModal from "./UpdateCategoryModal";

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [updateData, setUpdateData] = useState({});

  const { categories, meta, loading, refetch } = useAllCategory(page, limit);
   

  const columns: TableColumn<any>[] = [
    {
      header: "Name",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (category) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {category.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">
              {category.name}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Slug",
      className: "px-4",
      accessor: (category) => (
        <Text variant="body" color="dimmed" size="sm">
          {category.slug}
        </Text>
      ),
    },
    {
      header: "Description",
      className: "px-4 min-w-0",
      accessor: (category) => (
        <Text variant="body" color="dimmed" size="sm" className="truncate">
          {category.description || "No description"}
        </Text>
      ),
    },
    {
      header: "Courses",
      className: "px-4",
      accessor: (category) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <Text variant="body" color="dimmed" size="sm">
            {category.courses?.length || 0}
          </Text>
        </div>
      ),
    },
    {
      header: "Created",
      className: "px-4",
      accessor: (category) => (
        <Text variant="body" color="dimmed" size="sm">
          {new Date(category.createdAt).toLocaleDateString()}
        </Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (category) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="edit"
            title="Edit"
            size="action"
            onClick={() => {
              dispatch(openModal("updateCategory"));
              setUpdateData(category);
            }}
            centerIcon={<Edit className="w-4 h-4" />}
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
                All Categories
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
          data={categories}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1.5fr_2fr_0.8fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </GlassCard>

      <CreateCategoryModal refetch={refetch} />
      <UpdateCategoryModal refetch={refetch} updateData={updateData} />
    </>
  );
};
export default CategoryList;
