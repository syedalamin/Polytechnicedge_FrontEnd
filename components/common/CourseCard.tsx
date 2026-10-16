import Link from "next/link";
import { Clock, Play } from "lucide-react";
import Text from "./Text";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  thumbnail?: string | null;
  previewVideoUrl?: string | null;
  price: number;
  isPublished: boolean;
  isFeatured: boolean;
  level: string;
  categoryId: string;
  durationHours?: number | null;
  whatYouWillLearn: string[];
  requirements: string[];
  prerequisites: string[];
  tags: string[];
  accessExpiresInDays: number;
  category?: ICategory | null;
}

const levelColors: Record<string, string> = {
  BEGINNER: "bg-green-500/20 text-green-300",
  INTERMEDIATE: "bg-cyan-500/20 text-cyan-300",
  ADVANCED: "bg-pink-500/20 text-pink-300",
  ALL_LEVELS: "bg-purple-500/20 text-purple-300",
};

export default function CourseCard(course: ICourse) {
  const {
    title,
    slug,
    shortDescription,
    thumbnail,
    price,
    level,
    category,
    durationHours,
    isFeatured,
    accessExpiresInDays,
  } = course;

  return (
    <Link href={`/courses/${slug}`} className="group block h-full">
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-48 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 overflow-hidden shrink-0">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
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
          {isFeatured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full text-xs font-bold text-white">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            {/* Category & Level Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {category?.name && (
                <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                  {category.name}
                </span>
              )}
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  levelColors[level] || levelColors.ALL_LEVELS
                }`}
              >
                {level.replace("_", " ")}
              </span>
            </div>

            {/* Title */}
            <Text variant="h3" color="secondary" size="xl">
              {title}
            </Text>
            {/* Description */}
            {shortDescription && (
              <Text variant="body" color="dimmed" size="md" className="my-2">
                {shortDescription}
              </Text>
            )}
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <div className="flex items-center gap-2 text-xs   ">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <Text variant="body" color="dimmed" size="sm" >{durationHours} Minutes</Text>
            </div>

            <div className="flex items-center gap-2 text-xs  ">
              <Text variant="body" color="dimmed" size="sm" >
                Access Expires In: {accessExpiresInDays} Days
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
