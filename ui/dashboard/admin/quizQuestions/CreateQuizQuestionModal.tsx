"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import Text from "@/components/common/Text";
import { HelpCircle, Hash, List, CheckCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { quizQuestionSchema } from "@/zodSchemas/quizQuestion/quizQuestionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuizQuestionMutation } from "@/services/redux/api/modules/quizQuestionApi";

interface CreateQuizQuestionModalProps { refetch: () => void; quizId: string; }
type QuizQuestionFormData = z.infer<typeof quizQuestionSchema.createQuizQuestionSchema>;

const CreateQuizQuestionModal = ({ refetch, quizId }: CreateQuizQuestionModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addQuizQuestion"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createQuestion, { isLoading }] = useCreateQuizQuestionMutation();

  const onSubmit = async (data: QuizQuestionFormData) => {
    try {
      const res = await createQuestion({ ...data, quizId }).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("addQuizQuestion")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create question";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("addQuizQuestion"))} title="Add Question" modalSize="lg">
      <Form onSubmit={onSubmit}         resolver={zodResolver(quizQuestionSchema.createQuizQuestionSchema) as any} defaultValues={{ question: "", options: ["", ""], correctAnswer: [""], marks: 1, explanation: "" }}>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <TextareaField label="Question" name="question" placeholder="Enter the question" icon={<HelpCircle className="w-4 h-4" />} />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-cyan-400" />
              <Text variant="caption" color="dimmed" size="sm">Options (comma separated)</Text>
            </div>
            <InputField name="options" placeholder='e.g. Option A, Option B, Option C, Option D' />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <Text variant="caption" color="dimmed" size="sm">Correct Answers (comma separated)</Text>
            </div>
            <InputField name="correctAnswer" placeholder='e.g. Option A, Option C' />
          </div>
          <InputField label="Marks" name="marks" type="number" placeholder="1" icon={<Hash className="w-4 h-4" />} />
          <TextareaField label="Explanation" name="explanation" placeholder="Explanation for the correct answer" />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Add Question</Button>
      </Form>
    </Modal>
  );
};

export default CreateQuizQuestionModal;
