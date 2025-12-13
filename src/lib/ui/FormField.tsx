// src/lib/ui/FormField.tsx

// Import the FormFieldProps type from the types directory
import { FormFieldProps } from "@hart/lib/types";

export const FormField = ({ label, error, children }: FormFieldProps) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>

      {children}

      {error && <p className="text-error">{error}</p>}
    </fieldset>
  );
};
