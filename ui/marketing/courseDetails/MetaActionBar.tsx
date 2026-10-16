import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { ICourse } from "@/services/graphql";
import { ArrowRight, Clock, DollarSign, GraduationCap } from "lucide-react";
import Link from "next/link";

const MetaActionBar = ({ course }: { course: ICourse }) => {
  const accessExpiresInDays = course.accessExpiresInDays <= 0 ? false : true;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-10 mb-8 ">
      <div className="bg-[#0d1230] border border-white/10 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {course.price != null && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <Text color="gray" size="xs">
                  Course Price
                </Text>
                <Text color="white" size="md" variant="h3">
                  ${course.price}
                </Text>
              </div>
            </div>
          )}

          {course.accessExpiresInDays && (
            <div className="flex items-center gap-2.5 border-l border-white/10 pl-4 sm:pl-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <Text color="gray" size="xs">
                  Access Duration
                </Text>
                <Text color="white" size="md" variant="h3">
                  {course.accessExpiresInDays} Days
                </Text>
              </div>
            </div>
          )}

          {course.level && (
            <div className="flex items-center gap-2.5 border-l border-white/10 pl-4 sm:pl-6">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <Text color="gray" size="xs">
                  Level
                </Text>
                <Text color="white" size="md" variant="h3">
                  {course.level.replace("_", " ")}
                </Text>
              </div>
            </div>
          )}
        </div>

        <div>
          {accessExpiresInDays ? (
            <Link href="/login">
              <Button
                //   loading={isLoading}
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4 inline-block ml-2" />}
              >
                Enroll Now
              </Button>
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium">
              Enrollment Closed
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default MetaActionBar;
