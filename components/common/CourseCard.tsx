import Link from "next/link";
import { Star, Clock, Users, BookOpen, Play } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  thumbnail?: string | null;
  price: number;
  level: string;
  category: { name: string; slug: string };
  instructors: { firstName: string; lastName: string; profileImage?: string | null }[];
  durationHours?: number | null;
  enrollmentsCount: number;
  rating: number;
}

const levelColors: Record<string, string> = {
  BEGINNER: "bg-green-500/20 text-green-300",
  INTERMEDIATE: "bg-cyan-500/20 text-cyan-300",
  ADVANCED: "bg-pink-500/20 text-pink-300",
  ALL_LEVELS: "bg-purple-500/20 text-purple-300",
};

export default function CourseCard({
  title,
  slug,
  shortDescription,
  thumbnail,
  price,
  level,
  category,
  instructors,
  durationHours,
  enrollmentsCount,
  rating,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`} className="group block">
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-48 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 overflow-hidden">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-14 h-14 text-white/20 group-hover:text-white/40 transition-colors" />
            </div>
          )}
          {/* Price Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
            ${price}
          </div>
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full text-xs font-bold text-white">
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
              {category.name}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColors[level] || levelColors.ALL_LEVELS}`}>
              {level.replace("_", " ")}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
            {shortDescription}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
            {durationHours && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {durationHours}h
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {enrollmentsCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {instructors.length > 0 ? `${instructors[0].firstName} ${instructors[0].lastName}` : "TBA"}
            </span>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {/* Instructor */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 shrink-0" />
              <span className="text-sm text-gray-300">
                {instructors[0]?.firstName} {instructors[0]?.lastName}
              </span>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-white">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
