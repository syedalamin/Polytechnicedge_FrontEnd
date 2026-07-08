"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import Image from "next/image";
import { Mail, Phone, MapPin, GraduationCap, Calendar } from "lucide-react";

interface StudentDetailsModalProps { data: any; }

const StudentDetailsModal = ({ data }: StudentDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: any) => !!state.modal?.["studentDetails"]);

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal("studentDetails"))} title="Student Details" modalSize="md">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {data.profileImage ? (
            <Image alt="profile" src={data.profileImage} width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-2xl">
              {data.firstName?.charAt(0) || "?"}
            </div>
          )}
          <div>
            <Text variant="h2" color="white" size="lg">{data.firstName} {data.middleName} {data.lastName}</Text>
            <Text variant="body" color="dimmed" size="sm">{data.user?.email}</Text>
            <div className="flex items-center gap-1 mt-1">
              <span className={`w-2 h-2 rounded-full ${data.user?.status === "active" ? "bg-emerald-400" : "bg-gray-500"}`} />
              <Text variant="body" color="dimmed" size="sm">{data.user?.status || "Unknown"}</Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-400" />
            <Text variant="body" color="dimmed" size="sm">{data.user?.email}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-400" />
            <Text variant="body" color="dimmed" size="sm">{data.contactNumber1 || "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <Text variant="body" color="dimmed" size="sm">{data.address || "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-green-400" />
            <Text variant="body" color="dimmed" size="sm">{data.educationLevel || "N/A"}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <Text variant="body" color="dimmed" size="sm">{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}</Text>
          </div>
        </div>

        {data.interests?.length > 0 && (
          <div>
            <Text variant="body" color="white" size="sm" className="mb-2">Interests</Text>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest: string, i: number) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                  {interest}
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

export default StudentDetailsModal;
