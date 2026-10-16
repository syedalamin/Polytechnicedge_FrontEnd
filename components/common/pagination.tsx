 "use client";
import { IPaginationMeta } from "@/services/graphql";
import { ArrowLeft, ArrowRight } from "lucide-react";
 

 

interface PaginationProps {
  meta?: IPaginationMeta | null;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export default function Pagination({
  meta,
  onPageChange,
  className = "",
}: PaginationProps) {
   
  if (!meta || meta.totalPages <= 1) return null;

  const { page, totalPages } = meta;
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div
      className={`mt-12 flex items-center justify-center gap-4 ${className}`}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => hasPrevPage && onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/3 border border-white/10 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:shadow-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Previous</span>
      </button>

      {/* Page Indicator Badge */}
      <div className="px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-md text-xs font-semibold tracking-wider text-gray-300 shadow-inner">
        Page <span className="text-cyan-400 font-bold">{page}</span> of{" "}
        <span className="text-white">{totalPages}</span>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => hasNextPage && onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/3 border border-white/10 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:shadow-none cursor-pointer"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
