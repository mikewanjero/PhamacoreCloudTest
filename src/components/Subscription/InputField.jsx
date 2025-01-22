/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const InputField = forwardRef(
  ({ label, type, name, value, onChange, error }, ref) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        value={value}
        onChange={onChange}
        ref={ref}
        aria-invalid={!!error}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
);

InputField.displayName = "InputField";

export default InputField;
