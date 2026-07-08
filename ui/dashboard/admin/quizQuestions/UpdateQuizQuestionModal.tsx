"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { HelpCircle, Hash, List, CheckCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { quizQuestionSchema } from "@/zodSchemas/quizQuestion/quizQuestionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateQuizQuestionMutation } from "@/services/redux/api/modules/quizQuestionApi";

interface UpdateQuizQuestionModalProps { refetch: () => void; updateData: any; }
type QuizQuestionFormData = z.infer<typeof quizQuestionSchema.updateQuizQuestionSchema>;

const UpdateQuizQuestionModal = ({ refetch, updateData }: UpdateQuizQuestionModalProps) => {
  const dispatch = useAppDispatch();
  const [updateQuestion, { isLoading }] = useUpdateQuizQuestionMutation();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["updateQuizQuestion"]);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: QuizQuestionFormData) => {
    try {
      const id = updateData?.id;
      if (!id) { toast.error("Question ID not found"); return; }
      const res = await updateQuestion({ id, data }).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("updateQuizQuestion")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update question";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("updateQuizQuestion"))} title="Update Question" modalSize="lg">
      <Form onSubmit={onSubmit}         resolver={zodResolver(quizQuestionSchema.updateQuizQuestionSchema) as any} values={{ question: updateData?.question || "", options: updateData?.options || [], correctAnswer: updateData?.correctAnswer || [], marks: updateData?.marks || 1, explanation: updateData?.explanation || "" }}>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          <TextareaField label="Question" name="question" icon={<HelpCircle className="w-4 h-4" />} />
          <InputField name="options" placeholder="Option A, Option B, ..." />
          <InputField name="correctAnswer" placeholder="Correct answer(s)" />
          <InputField label="Marks" name="marks" type="number" icon={<Hash className="w-4 h-4" />} />
          <TextareaField label="Explanation" name="explanation" />
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Update Question</Button>
      </Form>
    </Modal>
  );
};

export default UpdateQuizQuestionModal;
