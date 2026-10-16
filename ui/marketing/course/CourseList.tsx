"use client";
import CourseCard from "@/components/common/CourseCard";
import Pagination from "@/components/common/pagination";
import { usePublishedCourses } from "@/services/graphql";
import { useState } from "react";
 

const MarketingCourseList = () => {
  const [page, setPage] = useState(1);
  const limit = 1;
  const { courses, meta, loading } = usePublishedCourses({}, page, limit);
  return (
    <div className="relative max-w-7xl mx-auto mt-12">
      {loading ? (
        <p className="text-white text-center">Loading courses...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          {/* Pagination */}
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default MarketingCourseList;
