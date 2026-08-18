"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, BookOpen, ChevronDown } from "lucide-react";
import CourseCard from "@/components/common/CourseCard";
import { sampleCourses, sampleCategories } from "@/lib/sample-data";

const levels = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL_LEVELS"] as const;

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    let courses = [...sampleCourses];

    // Search
    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription?.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== "all") {
      courses = courses.filter((c) => c.category.slug === selectedCategory);
    }

    // Level
    if (selectedLevel !== "ALL") {
      courses = courses.filter((c) => c.level === selectedLevel);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        courses.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        courses.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        courses.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        courses.sort((a, b) => (a.id > b.id ? -1 : 1));
        break;
      default:
        courses.sort((a, b) => b.enrollmentsCount - a.enrollmentsCount);
    }

    return courses;
  }, [search, selectedCategory, selectedLevel, sortBy]);

  const activeFilters =
    (selectedCategory !== "all" ? 1 : 0) + (selectedLevel !== "ALL" ? 1 : 0) + (search ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedLevel("ALL");
    setSortBy("popular");
  };

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Hero */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute top-32 right-10 w-60 h-60 bg-purple-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            {sampleCourses.length} courses available
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              Courses
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Find the perfect course to advance your career. Learn from industry experts at your own pace.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, topics, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block w-64 shrink-0 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-white font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      selectedCategory === "all"
                        ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    All Categories
                  </button>
                  {sampleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <h3 className="text-white font-semibold mb-4">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                        selectedLevel === level
                          ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {level === "ALL" ? "All Levels" : level.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Clear All Filters ({activeFilters})
                </button>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilters > 0 && (
                      <span className="w-5 h-5 bg-cyan-400 text-[#0a0e27] rounded-full text-xs font-bold flex items-center justify-center">
                        {activeFilters}
                      </span>
                    )}
                  </button>

                  <p className="text-gray-400 text-sm">
                    <span className="text-white font-semibold">{filteredCourses.length}</span> courses found
                  </p>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-cyan-400/50 cursor-pointer"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0a0e27]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Category</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          selectedCategory === "all"
                            ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                            : "bg-white/5 text-gray-400 border border-white/10"
                        }`}
                      >
                        All
                      </button>
                      {sampleCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            selectedCategory === cat.slug
                              ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                              : "bg-white/5 text-gray-400 border border-white/10"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Level</p>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            selectedLevel === level
                              ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                              : "bg-white/5 text-gray-400 border border-white/10"
                          }`}
                        >
                          {level === "ALL" ? "All" : level.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Course Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      slug={course.slug}
                      shortDescription={course.shortDescription}
                      thumbnail={course.thumbnail}
                      price={course.price}
                      level={course.level}
                      category={course.category}
                      instructors={course.instructors}
                      durationHours={course.durationHours}
                      enrollmentsCount={course.enrollmentsCount}
                      rating={course.rating}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your filters or search terms.</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 bg-white/5 border border-white/20 text-white rounded-xl text-sm hover:bg-white/10 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
