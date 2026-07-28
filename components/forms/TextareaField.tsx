import { ReactNode } from "react";
import {
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface TextareaFieldProps {
  label?: string;
  name: string;
  registerOptions?: RegisterOptions;
  placeholder?: string;
  icon?: ReactNode;
  rows?: number;
  className?: string;
}

export default function TextareaField({
  label,
  name,
  registerOptions,
  placeholder,
  icon,
  rows = 4,
  className = "",
}: TextareaFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-gray-300 block uppercase tracking-wide">
          {label}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors">
            {icon}
          </div>
        )}

        <textarea
          {...register(name, registerOptions)}
          rows={rows}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder-gray-500 text-sm resize-y min-h-25`}
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
