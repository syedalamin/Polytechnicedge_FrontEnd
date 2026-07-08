"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, Lock, Unlock, FileQuestion, Clock } from "lucide-react";
import Button from "@/components/common/Button";
import { useQuizzesByModuleId } from "@/services/graphql/quizzes/quizHook";
import { useState } from "react";
import CreateQuizModal from "./CreateQuizModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateQuizModal from "./UpdateQuizModal";
import QuizDetailsModal from "./QuizDetailsModal";
import Link from "next/link";

interface QuizListProps { moduleId: string; }

const QuizList = ({ moduleId }: QuizListProps) => {
  const dispatch = useAppDispatch();
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState({});
  const { quizzes, loading, refetch } = useQuizzesByModuleId(moduleId);

  const columns: TableColumn<any>[] = [
    {
      header: "Title",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (quiz) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            <FileQuestion className="w-4 h-4" />
          </div>
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">{quiz.title}</Text>
          </div>
        </div>
      ),
    },
    {
      header: "Time Limit",
      className: "px-4",
      accessor: (quiz) => (
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <Text variant="body" color="dimmed" size="sm">{quiz.timeLimit} min</Text>
        </div>
      ),
    },
    {
      header: "Pass Score",
      className: "px-4",
      accessor: (quiz) => (
        <Text variant="body" color="dimmed" size="sm">{quiz.passingScore}</Text>
      ),
    },
    {
      header: "Locked",
      className: "px-4",
      accessor: (quiz) => (
        quiz.isLocked
          ? <Lock className="w-4 h-4 text-red-400" />
          : <Unlock className="w-4 h-4 text-green-400" />
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (quiz) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/admin/quizzes/${quiz.id}/questions`}>
            <Button variant="edit" title="Questions" size="action" centerIcon={<FileQuestion className="w-4 h-4" />} />
          </Link>
          <Button variant="edit" title="Edit" size="action" onClick={() => { dispatch(openModal("updateQuiz")); setUpdateData(quiz); }} centerIcon={<Edit className="w-4 h-4" />} />
          <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("quizDetails")); setDetailData(quiz); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
        </div>
      ),
    },
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
          <Text color="white" variant="body" size="md">Module Quizzes</Text>
        </div>
        <GridTable data={quizzes || []} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[2fr_1fr_1fr_1fr_auto]" isLoading={loading} />
      </GlassCard>
      <CreateQuizModal refetch={refetch} moduleId={moduleId} />
      <UpdateQuizModal refetch={refetch} updateData={updateData} />
      <QuizDetailsModal data={detailData} />
    </>
  );
};
export default QuizList;
