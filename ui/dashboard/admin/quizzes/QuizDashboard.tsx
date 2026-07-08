"use client";
import QuizHeader from "./Header";
import QuizList from "./QuizList";

interface QuizDashboardProps { moduleId: string; }

const QuizDashboard = ({ moduleId }: QuizDashboardProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <QuizHeader moduleId={moduleId} />
        <QuizList moduleId={moduleId} />
      </div>
    </div>
  );
};

export default QuizDashboard;
