import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
}

export default function Form<T extends FieldValues>({
  onSubmit,
  children,
  className = "",
  ...formOptions
}: FormProps<T>) {
  const methods = useForm<T>({
    ...formOptions,  
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`space-y-4 ${className}`}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}