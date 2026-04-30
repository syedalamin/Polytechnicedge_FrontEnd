import { ReactNode } from "react";
import {
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface FormFieldProps {
  label?: string;
  name: string;
  registerOptions?: RegisterOptions;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  className?: string;
}

export default function InputField({
  label,
  name,
  registerOptions,
  type = "text",
  placeholder,
  icon,
  rightIcon,
  onRightIconClick,
  className = "",
}: FormFieldProps) {

  
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

        <input
          {...register(name, registerOptions)}
          type={type}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-3"} ${
            rightIcon ? "pr-10" : "pr-3"
          } py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder-gray-500 text-sm`}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}