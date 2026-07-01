import { Sparkles } from "lucide-react";

const MainIcon = () => {
  return (
    <div className="w-9 h-9 bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
      <Sparkles className="w-5 h-5 text-white" />
    </div>
  );
}

export default MainIcon;