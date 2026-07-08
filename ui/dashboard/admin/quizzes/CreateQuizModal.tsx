"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Form from "@/components/forms/Form";
import InputField from "@/components/forms/InputField";
import { FileQuestion, Clock, Hash } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { quizSchema } from "@/zodSchemas/quiz/quizSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuizMutation } from "@/services/redux/api/modules/quizApi";

interface CreateQuizModalProps { refetch: () => void; moduleId: string; }
type QuizFormData = z.infer<typeof quizSchema.createQuizSchema>;

const CreateQuizModal = ({ refetch, moduleId }: CreateQuizModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["addQuiz"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [createQuiz, { isLoading }] = useCreateQuizMutation();

  const onSubmit = async (data: QuizFormData) => {
    try {
      const res = await createQuiz({ ...data, moduleId }).unwrap();
      if (res?.success) { toast.success(res?.message); refetch(); dispatch(closeModal("addQuiz")); }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to create quiz";
      setErrorMessage(errorMsg); toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("addQuiz"))} title="Create Quiz" modalSize="md">
      <Form onSubmit={onSubmit}         resolver={zodResolver(quizSchema.createQuizSchema) as any} defaultValues={{ title: "", timeLimit: 2, passingScore: 10, isLocked: true, isAdaptive: false }}>
        <div className="space-y-4">
          <InputField label="Quiz Title" name="title" placeholder="e.g. Module 1 Quiz" icon={<FileQuestion className="w-4 h-4" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Time Limit (min)" name="timeLimit" type="number" icon={<Clock className="w-4 h-4" />} />
            <InputField label="Passing Score" name="passingScore" type="number" icon={<Hash className="w-4 h-4" />} />
          </div>
        </div>
        {errorMessage && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-3"><p className="text-red-400 text-sm text-center">{errorMessage}</p></div>)}
        <Button disabled={isLoading} className="w-full mt-4" loading={isLoading}>Create Quiz</Button>
      </Form>
    </Modal>
  );
};

export default CreateQuizModal;
