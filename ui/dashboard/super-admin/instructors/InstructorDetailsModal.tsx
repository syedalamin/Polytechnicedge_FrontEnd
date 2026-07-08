"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import Image from "next/image";
import { Mail, Phone, MapPin, GraduationCap, Briefcase, Star, Globe, ExternalLink } from "lucide-react";

interface InstructorDetailsModalProps { data: any; }

const InstructorDetailsModal = ({ data }: InstructorDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["instructorDetails"]);

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("instructorDetails"))} title="Instructor Details" modalSize="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {data.profileImage ? (
            <Image alt="profile" src={data.profileImage} width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
              {data.firstName?.charAt(0) || "?"}
            </div>
          )}
          <div>
            <Text variant="h2" color="white" size="lg">{data.firstName} {data.middleName} {data.lastName}</Text>
            <Text variant="body" color="dimmed" size="sm">{data.user?.email}</Text>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-amber-400" />
              <Text variant="body" color="white" size="sm">{data.rating?.toFixed(1) || "0.0"}</Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="dimmed" size="sm">{data.user?.email}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="dimmed" size="sm">{data.contactNumber1 || "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="dimmed" size="sm">{data.address || "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="dimmed" size="sm">{data.qualification || "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="dimmed" size="sm">{data.experienceYears ? `${data.experienceYears} years` : "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="dimmed" size="sm">{data.website || "N/A"}</Text>
          </div>
          {data.linkedin && (
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <Text variant="body" color="dimmed" size="sm">{data.linkedin}</Text>
            </div>
          )}
        </div>

        {data.expertise?.length > 0 && (
          <div>
            <Text variant="body" color="white" size="sm" className="mb-2">Expertise</Text>
            <div className="flex flex-wrap gap-2">
              {data.expertise.map((exp: string, i: number) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.bio && (
          <div>
            <Text variant="body" color="white" size="sm" className="mb-1">Bio</Text>
            <Text variant="body" color="dimmed" size="sm">{data.bio}</Text>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InstructorDetailsModal;
