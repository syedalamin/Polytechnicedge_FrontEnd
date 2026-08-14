"use client";
import { useAppDispatch } from "@/app/reduxHooks";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { openModal } from "@/services/redux/slices/modalSlice";
 
import { ArrowLeft, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";

interface ContentHeaderProps {
  courseId: string;
}

const ContentHeader = ({ courseId }: ContentHeaderProps) => {
  
  
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <Link
          href={`/instructor/courses/${courseId}`}
          className="p-2 rounded-lg hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <Text variant="h2" color="primary">
            Content Management
          </Text>
          <Text variant="body" color="secondary">
            Manage module content and materials
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          variant="primary"
          size="md"
          onClick={() => dispatch(openModal("addContent"))}
        >
          Add Content
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;
