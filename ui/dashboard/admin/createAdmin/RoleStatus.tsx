import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import { Shield, ShieldAlert } from "lucide-react";

const RoleStatus = ({admins}:{admins: any}) => {

    let adminCount = 0;
    let superAdminCount = 0;

    admins?.forEach((admin: any) => {
      if (admin?.user?.role === "ADMIN") adminCount++;
      if (admin?.user?.role === "SUPER_ADMIN") superAdminCount++;
    });
 

  const roleStats = [
    {
      label: "Super Admins",
      count: superAdminCount,
      icon: ShieldAlert,
      color: "from-purple-400 to-pink-500",
    },
    {
      label: "Admins",
      count: adminCount,
      icon: Shield,
      color: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
      {roleStats.map((rs) => (
        <GlassCard paddingSize="xs">
          <div key={rs.label} className="   flex items-center gap-2 sm:gap-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br ${rs.color} flex items-center justify-center shadow-lg shrink-0`}
            >
              <rs.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
            </div>

            <div className="flex flex-col min-w-0">
              <Text
                variant="caption"
                size="sm"
                color="dimmed"
                className="truncate"
              >
                {rs.label}
              </Text>

              <Text
                variant="h2"
                size="lg"
                color="white"
                className="mt-0.5 sm:mt-1"
              >
                {rs.count}
              </Text>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default RoleStatus;
