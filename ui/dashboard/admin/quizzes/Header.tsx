"use client";
import { useAppDispatch } from "@/app/reduxHooks";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { openModal } from "@/services/redux/slices/modalSlice";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

interface QuizHeaderProps { moduleId: string; }

const QuizHeader = ({ moduleId }: QuizHeaderProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <Link href="/admin/courses" className="text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <Text variant="h2" color="primary">Quiz Management</Text>
          <Text variant="body" color="secondary">Manage module quizzes and assessments</Text>
        </div>
      </div>
      <Button leftIcon={<Plus className="w-4 h-4" />} variant="primary" size="md" onClick={() => dispatch(openModal("addQuiz"))}>
        Add Quiz
      </Button>
    </div>
  );
};

export default QuizHeader;
