import { ReactNode, useEffect } from "react";
import Button from "./Button";
import Text from "./Text";
import GlassCard from "./GlassCard";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;

  confirmLabel?: string;
  onConfirm?: () => void;
  loading?: boolean;
  modalSize?: "sm" | "md" | "lg" | "full";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  modalSize = "md",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-md sm:max-w-lg md:max-w-2xl",
    lg: "max-w-md sm:max-w-3xl md:max-w-4xl",
    full: "max-w-[95vw] md:max-w-[98vw] h-[95vh] sm:h-[94vh]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <GlassCard
        paddingSize="lg"
        className={`relative w-full ${sizeClasses[modalSize]} bg-[#0f0f11]/90 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]`}
      >
        <div className="flex items-center justify-between mb-4">
          <Text variant="h3" color="white">
            {title}
          </Text>

          <Button
            variant="more"
            size="action"
            onClick={onClose}
            centerIcon={<X className="w-4 h-4  " />}
          />
        </div>

        <div className="mb-6">
          {typeof children === "string" ? (
            <Text variant="body" color="dimmed">
              {children}
            </Text>
          ) : (
            children
          )}
        </div>
      </GlassCard>
    </div>
  );
}
