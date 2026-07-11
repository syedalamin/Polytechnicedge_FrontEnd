"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import {
  BookOpen, DollarSign, GraduationCap, Globe, Clock, Tag, Image, PlayCircle,
  ListChecks, Lightbulb, BookMarked, Calendar, Star, Shield, Hash
} from "lucide-react";

interface CourseDetailsModalProps {
  data: any;
}

const CourseDetailsModal = ({ data }: CourseDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["courseDetails"]);

  if (!data) return null;

  const basicItems = [
    { label: "Title", value: data.title, icon: <GraduationCap className="w-4 h-4 text-cyan-400" /> },
    { label: "Slug", value: data.slug, icon: <Tag className="w-4 h-4 text-cyan-400" /> },
    { label: "Category", value: data.category?.name || "N/A", icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Price", value: `$${data.price}`, icon: <DollarSign className="w-4 h-4 text-cyan-400" /> },
    { label: "Level", value: data.level, icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { label: "Duration", value: data.durationHours ? `${data.durationHours} min` : "N/A", icon: <Clock className="w-4 h-4 text-cyan-400" /> },
    { label: "Status", value: data.isPublished ? "Published" : "Draft", icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { label: "Modules", value: data.modules?.length || 0, icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: "Access Expires", value: data.accessExpiresInDays ? `${data.accessExpiresInDays} days` : "N/A", icon: <Shield className="w-4 h-4 text-cyan-400" /> },
    { label: "Featured", value: data.isFeatured ? "Yes" : "No", icon: <Star className="w-4 h-4 text-cyan-400" /> },
    { label: "Created", value: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A", icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
    { label: "Updated", value: data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "N/A", icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
  ];

  const renderList = (label: string, items: string[] | undefined, icon: React.ReactNode) => {
    if (!items || items.length === 0) return null;
    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <Text variant="caption" color="dimmed" size="sm">{label}</Text>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span key={i} className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("courseDetails"))} title="Course Details">
      <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {basicItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.icon}
              <div>
                <Text variant="caption" color="dimmed" size="sm">{item.label}</Text>
                <Text variant="body" color="white" size="sm">{item.value}</Text>
              </div>
            </div>
          ))}
        </div>

        {data.shortDescription && (
          <div>
            <Text variant="caption" color="dimmed" size="sm">Short Description</Text>
            <Text variant="body" color="white" size="sm">{data.shortDescription}</Text>
          </div>
        )}

        {data.longDescription && (
          <div>
            <Text variant="caption" color="dimmed" size="sm">Long Description</Text>
            <Text variant="body" color="white" size="sm" className="whitespace-pre-wrap">{data.longDescription}</Text>
          </div>
        )}

        {data.thumbnail && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-4 h-4 text-cyan-400" />
              <Text variant="caption" color="dimmed" size="sm">Thumbnail</Text>
            </div>
            <a href={data.thumbnail} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-sm break-all">
              {data.thumbnail}
            </a>
          </div>
        )}

        {data.previewVideoUrl && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle className="w-4 h-4 text-cyan-400" />
              <Text variant="caption" color="dimmed" size="sm">Preview Video</Text>
            </div>
            <a href={data.previewVideoUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-sm break-all">
              {data.previewVideoUrl}
            </a>
          </div>
        )}

        {renderList("What You Will Learn", data.whatYouWillLearn, <Lightbulb className="w-4 h-4 text-cyan-400" />)}
        {renderList("Requirements", data.requirements, <ListChecks className="w-4 h-4 text-cyan-400" />)}
        {renderList("Prerequisites", data.prerequisites, <BookMarked className="w-4 h-4 text-cyan-400" />)}
        {renderList("Tags", data.tags, <Hash className="w-4 h-4 text-cyan-400" />)}
      </div>
    </Modal>
  );
};

export default CourseDetailsModal;
