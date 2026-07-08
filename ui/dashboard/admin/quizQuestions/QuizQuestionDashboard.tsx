"use client";
import QuizQuestionHeader from "./Header";
import QuizQuestionList from "./QuizQuestionList";

interface QuizQuestionDashboardProps { quizId: string; }

const QuizQuestionDashboard = ({ quizId }: QuizQuestionDashboardProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <QuizQuestionHeader quizId={quizId} />
        <QuizQuestionList quizId={quizId} />
      </div>
    </div>
  );
};

export default QuizQuestionDashboard;
