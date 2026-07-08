"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { HelpCircle, Hash, CheckCircle } from "lucide-react";

interface QuizQuestionDetailsModalProps { data: any; }

const QuizQuestionDetailsModal = ({ data }: QuizQuestionDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["quizQuestionDetails"]);
  if (!data) return null;
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("quizQuestionDetails"))} title="Question Details">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <Text variant="caption" color="dimmed" size="sm">Question</Text>
            <Text variant="body" color="white" size="sm">{data.question}</Text>
          </div>
        </div>
        <div>
          <Text variant="caption" color="dimmed" size="sm">Options</Text>
          {data.options?.map((opt: string, i: number) => (
            <div key={i} className={`flex items-center gap-2 p-2 rounded mt-1 ${data.correctAnswer?.includes(opt) ? 'bg-green-500/20' : 'bg-white/5'}`}>
              {data.correctAnswer?.includes(opt) && <CheckCircle className="w-4 h-4 text-green-400" />}
              <Text variant="body" color="white" size="sm">{opt}</Text>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Hash className="w-4 h-4 text-cyan-400" />
          <div>
            <Text variant="caption" color="dimmed" size="sm">Marks</Text>
            <Text variant="body" color="white" size="sm">{data.marks}</Text>
          </div>
        </div>
        {data.explanation && (
          <div>
            <Text variant="caption" color="dimmed" size="sm">Explanation</Text>
            <Text variant="body" color="white" size="sm">{data.explanation}</Text>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default QuizQuestionDetailsModal;
