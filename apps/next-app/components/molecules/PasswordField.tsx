"use client";

import { useState } from "react";
import { FormField, FormFieldProps } from "@/components/molecules/FormField";
import { EyeIcon } from "@/components/atoms/icons/EyeIcon";
import { EyeOffIcon } from "@/components/atoms/icons/EyeOffIcon";

export type PasswordFieldProps = Omit<FormFieldProps, "type" | "endAdornment">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          className="text-muted hover:text-white"
        >
          {visible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      }
    />
  );
}
