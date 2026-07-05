"use client";

import React from "react";
import Text from "@/components/common/Text";
import Button from "./Button";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface GridTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  gridLayoutClass: string;
  rowKeyAccessor: keyof T | ((item: T) => string | number);
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function GridTable<T>({
  data,
  columns,
  gridLayoutClass,
  rowKeyAccessor,
  onRowClick,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: GridTableProps<T>) {
  const getKey = (item: T, index: number): string | number => {
    if (typeof rowKeyAccessor === "function") return rowKeyAccessor(item);
    return (item[rowKeyAccessor] as string | number) || index;
  };

  return (
    <div className="w-full overflow-x-auto overflow-hidden  ">
      <div className="min-w-3xl">
        <div
          className={`grid ${gridLayoutClass} border-b border-white/5 bg-white/2 items-center py-3`}
        >
          {columns.map((col, index) => (
            <div key={index} className={col.className || "px-4"}>
              <Text variant="caption" color="dimmed" size="sm">
                {col.header}
              </Text>
            </div>
          ))}
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="text-center py-16 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <Text variant="body" color="dimmed" size="md">
                Loading data, please wait...
              </Text>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-16">
              <Text
                variant="body"
                color="dimmed"
                size="md"
                className="font-medium"
              >
                No data found
              </Text>
            </div>
          ) : (
            data.map((item, rowIndex) => (
              <div
                key={getKey(item, rowIndex)}
                onClick={() => onRowClick?.(item)}
                className={`grid ${gridLayoutClass} items-center hover:bg-white/5 transition-colors group py-4 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((col, colIndex) => (
                  <div key={colIndex} className={col.className || "px-4"}>
                    {typeof col.accessor === "function" ? (
                      col.accessor(item)
                    ) : (
                      <Text variant="body" color="white" size="sm">
                        {item[col.accessor] as React.ReactNode}
                      </Text>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-white/5 bg-white/1">
            <div>
              <Text variant="caption" color="dimmed" size="sm">
                Page {currentPage} of {totalPages}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                variant="outline"
                size="xs"
              >
                &larr; Previous
              </Button>

              <Button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                variant="outline"
                size="xs"
              >
                Next &rarr;
              </Button>
 
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
