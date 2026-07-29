"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import Image from "next/image";
import {
  BookMarked,
  DollarSign,
  FileText,
  Clock,
  BookOpen,
  Tag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BundleDetailsModalProps {
  data: any;
}

const BundleDetailsModal = ({ data }: BundleDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["bundleDetails"],
  );

  if (!data) return null;

  const courseCount = data.items?.length || 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("bundleDetails"))}
      title="Bundle Details"
      modalSize="lg"
    >
      <div className="space-y-5">
        <div className="w-full bg-slate-900 rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          <div className="relative w-full bg-linear-to-br from-cyan-500 via-purple-600 to-pink-500 min-h-28 sm:min-h-36 flex items-end p-4 sm:p-6">
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                <BookMarked className="w-6 h-6 text-white" />
              </div>
              <div>
                <Text
                  variant="body"
                  color="white"
                  size="xl"
                  className="font-bold tracking-wide"
                >
                  {data.title}
                </Text>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      data.isPublished
                        ? "bg-green-500/30 text-green-200 border border-green-400/30"
                        : "bg-yellow-500/30 text-yellow-200 border border-yellow-400/30"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        data.isPublished ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    />
                    {data.isPublished ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-white/60">
                    {courseCount} course{courseCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Price",
              value: `$${data.price}`,
              icon: DollarSign,
              color: "from-emerald-400 to-teal-500",
            },
            {
              label: "Courses",
              value: courseCount,
              icon: BookOpen,
              color: "from-cyan-400 to-blue-500",
            },
            {
              label: "Status",
              value: data.isPublished ? "Published" : "Draft",
              icon: FileText,
              color: data.isPublished
                ? "from-green-400 to-emerald-500"
                : "from-yellow-400 to-amber-500",
            },
            {
              label: "Created",
              value: data.createdAt
                ? new Date(data.createdAt).toLocaleDateString()
                : "—",
              icon: Clock,
              color: "from-purple-400 to-pink-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5"
            >
              <div
                className={`w-9 h-9 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center shrink-0`}
              >
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <Text variant="caption" color="dimmed" size="xs">
                  {stat.label}
                </Text>
                <Text
                  variant="body"
                  color="white"
                  size="sm"
                  className="font-semibold truncate"
                >
                  {stat.value}
                </Text>
              </div>
            </div>
          ))}
        </div>

        {data.description && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <Text variant="caption" color="dimmed" size="sm">
                Description
              </Text>
            </div>
            <Text variant="body" color="white" size="sm" className="leading-relaxed">
              {data.description}
            </Text>
          </div>
        )}

        <Separator className="bg-white/10" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <Text variant="caption" color="dimmed" size="md">
              Courses in this Bundle
            </Text>
            <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
              {courseCount}
            </span>
          </div>

          {data.items?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.items.map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex">
                    <div className="relative w-24 h-24 shrink-0 bg-slate-800">
                      {item.course?.thumbnail ? (
                        <Image
                          src={item.course.thumbnail}
                          alt={item.course.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-slate-900/60" />
                    </div>
                    <div className="flex-1 p-3 min-w-0">
                      <Text
                        variant="body"
                        color="white"
                        size="sm"
                        className="font-medium line-clamp-1"
                      >
                        {item.course?.title || "Unknown Course"}
                      </Text>
                      {item.course?.price && (
                        <div className="flex items-center gap-1 mt-1">
                          <DollarSign className="w-3 h-3 text-emerald-400" />
                          <Text
                            variant="body"
                            color="white"
                            size="xs"
                            className="text-emerald-400 font-semibold"
                          >
                            {item.course.price}
                          </Text>
                        </div>
                      )}
                      {item.priceAtBundleTime && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Tag className="w-3 h-3 text-cyan-400" />
                          <Text
                            variant="caption"
                            color="dimmed"
                            size="xs"
                          >
                            At bundle: ${item.priceAtBundleTime}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <BookOpen className="w-8 h-8 text-white/20 mx-auto mb-2" />
              <Text variant="body" color="dimmed" size="sm">
                No courses in this bundle
              </Text>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BundleDetailsModal;
