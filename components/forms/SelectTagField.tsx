import { ReactNode } from "react";
import { RegisterOptions, useFormContext, Controller } from "react-hook-form";
import { X, ChevronDown } from "lucide-react";

interface OptionType {
  value: string;
  label: string;
}

interface SelectTagFieldProps {
  label?: string;
  name: string;
  registerOptions?: RegisterOptions;
  options: OptionType[];
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  // নতুন প্রপ: এটি ঠিক করবে ডাটা অবজেক্ট হবে নাকি স্ট্রিং
  valueType?: "object" | "string";
}

export default function SelectTagField({
  label,
  name,
  registerOptions,
  options,
  placeholder = "Select items...",
  icon,
  className = "",
  valueType = "object", // ডিফল্টভাবে অবজেক্ট থাকবে যাতে আগের কোড ব্রেক না করে
}: SelectTagFieldProps) {
  const { control } = useFormContext();

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
          const handleSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            const selectedValue = e.target.value;
            if (!selectedValue) return;

            // ভ্যালু টাইপ অনুযায়ী চেক করা যে অলরেডি সিলেক্টেড কি না
            const isAlreadySelected =
              valueType === "string"
                ? value.includes(selectedValue)
                : value.some(
                    (item: any) =>
                      String(item.courseId) === String(selectedValue),
                  );

            if (!isAlreadySelected) {
              // স্ট্রিং হলে সরাসরি আইডি, নাহলে অবজেক্ট
              onChange(
                valueType === "string"
                  ? [...value, selectedValue]
                  : [...value, { courseId: selectedValue }],
              );
            }

            e.target.value = "";
          };

          const removeTag = (idToRemove: string) => {
            onChange(
              valueType === "string"
                ? value.filter(
                    (id: string) => String(id) !== String(idToRemove),
                  )
                : value.filter(
                    (item: any) => String(item.courseId) !== String(idToRemove),
                  ),
            );
          };

          const availableOptions = options.filter((opt) =>
            valueType === "string"
              ? !value.includes(opt.value)
              : !value.some(
                  (item: any) => String(item.courseId) === String(opt.value),
                ),
          );

          return (
            <div className="space-y-1">
              <div className="relative group flex flex-wrap gap-1.5 items-center w-full min-h-11 p-2 bg-white/5 border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all">
                {icon && value.length === 0 && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                    {icon}
                  </div>
                )}

                {value.map((item: any) => {
                  // স্ট্রিং হলে item নিজেই আইডি, নাহলে item.courseId
                  const currentId =
                    valueType === "string" ? item : item.courseId;

                  const optionObj = options.find(
                    (opt) => String(opt.value) === String(currentId),
                  );
                  const displayLabel = optionObj ? optionObj.label : currentId;

                  return (
                    <span
                      key={currentId}
                      className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium pl-2 pr-1.5 py-1 rounded-md border border-cyan-500/20"
                    >
                      {displayLabel}
                      <button
                        type="button"
                        onClick={() => removeTag(currentId)}
                        className="hover:bg-cyan-500/20 rounded p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3 text-cyan-400 hover:text-red-400" />
                      </button>
                    </span>
                  );
                })}

                <div className="relative flex-1 min-w-37.5">
                  <select
                    onChange={handleSelectChange}
                    defaultValue=""
                    className={`w-full bg-transparent outline-none text-white text-sm appearance-none cursor-pointer py-0.5 ${
                      icon && value.length === 0 ? "pl-7" : "pl-1"
                    } pr-8`}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#0a0e27] text-gray-500"
                    >
                      {value.length === 0 ? placeholder : "Add more..."}
                    </option>
                    {availableOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#0a0e27] text-white"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
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
