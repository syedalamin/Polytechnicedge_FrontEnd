"use client"
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import { LayoutGrid } from "lucide-react";
import { useAllCategory } from "@/services/graphql/category/categoryHook";

const CategoryStats = () => {
  const { categories } = useAllCategory();

  const totalCategories = categories?.length || 0;

  const stats = [
    {
      label: "Total Categories",
      count: totalCategories,
      icon: LayoutGrid,
      color: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats.map((s) => (
        <GlassCard key={s.label} paddingSize="xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br ${s.color} flex items-center justify-center shadow-lg shrink-0`}
            >
              <s.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <Text variant="caption" size="sm" color="dimmed" className="truncate">
                {s.label}
              </Text>
              <Text variant="h2" size="lg" color="white" className="mt-0.5 sm:mt-1">
                {s.count}
              </Text>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default CategoryStats;
