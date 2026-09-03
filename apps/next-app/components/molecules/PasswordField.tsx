"use client";

import { useState } from "react";
import { FormField, FormFieldProps } from "@/components/molecules/FormField";
import { EyeIcon } from "@/components/atoms/icons/EyeIcon";
import { EyeOffIcon } from "@/components/atoms/icons/EyeOffIcon";

export type PasswordFieldProps = Omit<FormFieldProps, "type" | "endAdornment">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  // Inclui o label do campo no nome acessível do botão: uma página pode ter
  // mais de um PasswordField (ex.: cadastro com "senha" + "confirmar senha"),
  // e um aria-label fixo faria os dois botões colidirem no nome acessível.
  const toggleLabel = `${visible ? "Ocultar" : "Mostrar"} ${props.label}`;

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={toggleLabel}
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
