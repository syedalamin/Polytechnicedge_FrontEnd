"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const QuizAttemptHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">Quiz Attempt Management</Text>
      <Text variant="body" color="secondary">View all quiz attempts and results</Text>
    </div>
  </div>
);
export default QuizAttemptHeader;
