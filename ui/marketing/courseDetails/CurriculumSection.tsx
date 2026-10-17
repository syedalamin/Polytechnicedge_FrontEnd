import { WeekGroup } from "@/app/(marketing)/courses/[slug]/page";

import { IContentBrief } from "@/services/graphql";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Headphones,
  LinkIcon,
  Lock,
  Monitor,
  Play,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const contentTypeIcons: Record<string, any> = {
  VIDEO: <Video className="w-3.5 h-3.5 text-blue-400" />,
  TEXT: <FileText className="w-3.5 h-3.5 text-green-400" />,
  PDF: <FileText className="w-3.5 h-3.5 text-red-400" />,
  AUDIO: <Headphones className="w-3.5 h-3.5 text-purple-400" />,
  EXTERNAL_LINK: <LinkIcon className="w-3.5 h-3.5 text-amber-400" />,
  INTERACTIVE: <Monitor className="w-3.5 h-3.5 text-cyan-400" />,
};

function UnlockedContentPreview({ content }: { content: IContentBrief }) {
  if (content.contentType === "VIDEO" && content.contentUrl) {
    console.log("Rendering video for content:", content.contentUrl);
    return (
      <iframe
        title={content.title}   
        src={content.contentUrl}
        aria-controls=""
        className="w-full aspect-video rounded-lg bg-black object-contain mt-2"
      />
    );
  }

  if (content.contentUrl) {
    return (
      <Link
        href={content.contentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-lg bg-white/5 border border-white/10 p-2.5 hover:border-cyan-400/40 transition-colors mt-2"
      >
        <LinkIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-xs text-white truncate flex-1">
          {content.contentUrl}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </Link>
    );
  }

  return (
    <div className="max-h-48 overflow-y-auto rounded-lg bg-black/30 border border-white/5 p-3 mt-2">
      <p className="text-xs text-gray-300 whitespace-pre-wrap">
        {content.textContent || "No text content provided."}
      </p>
    </div>
  );
}

const CurriculumSection = ({ weeks }: { weeks: WeekGroup[] }) => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [openContentId, setOpenContentId] = useState<string | null>(null);

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
      <h2 className="text-xl font-bold mb-5 text-white">Course Curriculum</h2>

      <div className="space-y-5">
        {weeks.map(({ week, modules }) => (
          <div
            key={week}
            className="bg-[#0d1230] border border-white/10 rounded-xl p-4 sm:p-5"
          >
            {/* Week Title Header */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                Week {week}
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-gray-200">
                Advanced Frontend & Next.js App Router Architecture
              </h3>
            </div>

            {/* Modules List */}
            <div className="space-y-2.5">
              {modules.map((module) => {
                const isModuleOpen = openModuleId === module.id;

                return (
                  <div
                    key={module.id}
                    className="border border-white/10 rounded-lg bg-[#131838] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenModuleId(isModuleOpen ? null : module.id)
                      }
                      className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {module.title}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span>{module.contents?.length ?? 0} lessons</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isModuleOpen ? "rotate-180 text-cyan-400" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Lessons inside Module */}
                    {isModuleOpen && module.contents && (
                      <div className="p-2.5 border-t border-white/5 bg-[#0a0e27]/50 space-y-1.5">
                        {module.contents.map((content) => {
                          const isLocked = content.isLocked;
                          const isContentOpen = openContentId === content.id;

                          return (
                            <div
                              key={content.id}
                              className="rounded-md bg-white/5 border border-white/5 overflow-hidden"
                            >
                              <button
                                type="button"
                                disabled={isLocked}
                                onClick={() =>
                                  !isLocked &&
                                  setOpenContentId(
                                    isContentOpen ? null : content.id,
                                  )
                                }
                                className={`w-full flex items-center justify-between p-2.5 text-left ${
                                  isLocked
                                    ? "cursor-not-allowed opacity-65"
                                    : "hover:bg-white/5 cursor-pointer"
                                }`}
                              >
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                  {contentTypeIcons[content.contentType] || (
                                    <Play className="w-3 h-3 text-cyan-400 shrink-0" />
                                  )}
                                  <span>{content.title}</span>
                                </div>

                                {isLocked ? (
                                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                    <span>Locked</span>
                                    <Lock className="w-3 h-3" />
                                  </div>
                                ) : (
                                  <ChevronRight
                                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                                      isContentOpen
                                        ? "rotate-90 text-cyan-400"
                                        : ""
                                    }`}
                                  />
                                )}
                              </button>

                              {!isLocked && isContentOpen && (
                                <div className="p-2.5 border-t border-white/5 bg-black/20">
                                  <UnlockedContentPreview content={content} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CurriculumSection;
