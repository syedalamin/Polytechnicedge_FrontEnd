"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { User, FileQuestion, Hash, CheckCircle, XCircle, Calendar } from "lucide-react";

interface QuizAttemptDetailsModalProps { data: any; }

const QuizAttemptDetailsModal = ({ data }: QuizAttemptDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["quizAttemptDetails"]);
  if (!data) return null;
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("quizAttemptDetails"))} title="Quiz Attempt Details">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">User</Text><Text variant="body" color="white" size="sm">{data.user?.email || "N/A"}</Text></div>
        </div>
        <div className="flex items-center gap-3">
          <FileQuestion className="w-4 h-4 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Quiz</Text><Text variant="body" color="white" size="sm">{data.quiz?.title || "N/A"}</Text></div>
        </div>
        <div className="flex items-center gap-3">
          <Hash className="w-4 h-4 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Score</Text><Text variant="body" color="white" size="sm">{data.score}</Text></div>
        </div>
        <div className="flex items-center gap-3">
          {data.isPassed ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
          <div><Text variant="caption" color="dimmed" size="sm">Result</Text><Text variant="body" color="white" size="sm">{data.isPassed ? "Passed" : "Failed"}</Text></div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <div><Text variant="caption" color="dimmed" size="sm">Date</Text><Text variant="body" color="white" size="sm">{new Date(data.attemptedAt).toLocaleString()}</Text></div>
        </div>
      </div>
    </Modal>
  );
};
export default QuizAttemptDetailsModal;
