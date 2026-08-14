"use client";
import { useState } from "react";
import {  useMeForInstructor, useUpdateMe } from "@/services/graphql/user/userHook";
import GlassCard from "@/components/common/GlassCard";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";

const ProfileDashboard = () => {
  const { data: me, loading: meLoading } = useMeForInstructor();
  const { updateMe, loading } = useUpdateMe();

  const [username, setUsername] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (me && !initialized) {
    setUsername(me.username || "");
    setInitialized(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMe({ username });
  };

  if (meLoading) {
    return <GlassCard paddingSize="md"><Text variant="body" color="dimmed" size="sm">Loading...</Text></GlassCard>;
  }

  return (
    <GlassCard paddingSize="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Text variant="body" color="white" size="sm">Email</Text>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <Text variant="body" color="dimmed" size="sm">{me?.email || "N/A"}</Text>
          </div>
        </div>
        <div className="space-y-2">
          <Text variant="body" color="white" size="sm">Role</Text>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <Text variant="body" color="dimmed" size="sm">{me?.role || "N/A"}</Text>
          </div>
        </div>
        {me?.instructorProfile && (
          <>
            <div className="space-y-2">
              <Text variant="body" color="white" size="sm">Name</Text>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Text variant="body" color="dimmed" size="sm">{me.instructorProfile.firstName} {me.instructorProfile.lastName}</Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text variant="body" color="white" size="sm">Qualification</Text>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Text variant="body" color="dimmed" size="sm">{me.instructorProfile.qualification || "N/A"}</Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text variant="body" color="white" size="sm">Expertise</Text>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Text variant="body" color="dimmed" size="sm">{me.instructorProfile.expertise?.join(", ") || "N/A"}</Text>
              </div>
            </div>
          </>
        )}
        <div className="space-y-2">
          <Text variant="body" color="white" size="sm">Username</Text>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-2.5 px-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder-gray-500 text-sm"
          />
        </div>
        <Button type="submit" variant="primary" size="md" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </GlassCard>
  );
};
export default ProfileDashboard;
