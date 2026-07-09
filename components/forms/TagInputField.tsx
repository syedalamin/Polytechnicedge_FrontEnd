import { ReactNode, useState, KeyboardEvent } from "react";
import { RegisterOptions, useFormContext, Controller } from "react-hook-form";
import { X } from "lucide-react"; 


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

export default function TagInputField({
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
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-gray-300 block uppercase tracking-wide">
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        rules={registerOptions} 
        render={({
          field: { value = [], onChange },
          fieldState: { error },
        }) => {
          
          const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "," || e.key === "Enter") {
              e.preventDefault();
              const trimmedValue = inputValue.trim();

             
              if (trimmedValue && !value.includes(trimmedValue)) {
                onChange([...value, trimmedValue]);
              }
              setInputValue(""); 
            }
          };

      
          const removeTag = (indexToRemove: number) => {
            onChange(
              value.filter((_: any, index: number) => index !== indexToRemove),
            );
          };

          return (
            <div className="space-y-1">

              <div className="relative group flex flex-wrap gap-1.5 items-center w-full min-h-11 p-2 bg-white/5 border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all">
               
                {icon && value.length === 0 && !inputValue && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors">
                    {icon}
                  </div>
                )}


                {value.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium pl-2 pr-1.5 py-1 rounded-md border border-cyan-500/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:bg-cyan-500/20 rounded p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3 text-cyan-400 hover:text-red-400" />
                    </button>
                  </span>
                ))}

       
                <input
                  type={type}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={value.length === 0 ? placeholder : ""}
                  className={`flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm min-w-25 py-0.5 ${
                    icon && value.length === 0 ? "pl-7" : "pl-1"
                  } ${rightIcon ? "pr-7" : ""}`}
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

           
              {error?.message && (
                <p className="text-red-400 text-xs">{error.message}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
