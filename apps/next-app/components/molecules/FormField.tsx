import { ReactNode, useId } from "react";
import { Label } from "@/components/atoms/Label";
import { Input, InputProps } from "@/components/atoms/Input";

export interface FormFieldProps extends Omit<InputProps, "id"> {
  label: string;
  error?: string;
  id?: string;
  endAdornment?: ReactNode;
}

export function FormField({
  label,
  error,
  id,
  endAdornment,
  className,
  ...inputProps
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <Label htmlFor={fieldId}>{label}</Label>
      <div className="relative">
        <Input
          id={fieldId}
          invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={[endAdornment ? "pr-10" : "", className]
            .filter(Boolean)
            .join(" ")}
          {...inputProps}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
