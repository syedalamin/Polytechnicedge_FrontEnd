import Text from "@/components/common/Text";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const AboutCourseSection = ({ description }: { description: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8">
      <div className="bg-[#0d1230] border border-white/10 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/5 transition-colors"
        >
          <Text size="lg" variant="h1" color="white">
            About This Course
          </Text>

          <ChevronDown
            className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {!isOpen && (
          <Text
            size="sm"
            color="gray"
            className="p-4 sm:p-5 pt-0 border-t border-white/5  "
          >
            {description}
          </Text>
        )}
      </div>
    </section>
  );
};

export default AboutCourseSection;
