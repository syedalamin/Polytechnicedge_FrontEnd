"use client";
import { useParams } from "next/navigation";
import QuizQuestionDashboard from "@/ui/dashboard/admin/quizQuestions/QuizQuestionDashboard";

const QuizQuestionPage = () => {
  const params = useParams();
  const quizId = params.quizId as string;
  return <QuizQuestionDashboard quizId={quizId} />;
};

export default QuizQuestionPage;
