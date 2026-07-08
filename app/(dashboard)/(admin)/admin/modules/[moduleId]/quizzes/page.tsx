"use client";
import { useParams } from "next/navigation";
import QuizDashboard from "@/ui/dashboard/admin/quizzes/QuizDashboard";

const QuizPage = () => {
  const params = useParams();
  const moduleId = params.moduleId as string;
  return <QuizDashboard moduleId={moduleId} />;
};

export default QuizPage;
