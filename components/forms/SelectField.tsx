import { ReactNode } from "react";
import {
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface SelectFieldProps {
  label?: string;
  name: string;
  registerOptions?: RegisterOptions;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
}

export default function SelectField({
  label,
  name,
  registerOptions,
  options,
  placeholder = "Select...",
  icon,
  className = "",
}: SelectFieldProps) {
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
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors">
            {icon}
          </div>
        )}

        <select
          {...register(name, registerOptions)}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white text-sm appearance-none cursor-pointer`}
        >
          <option value="" className="bg-[#0a0e27] text-gray-400">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0a0e27]">
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
