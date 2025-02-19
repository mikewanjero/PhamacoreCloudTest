/* eslint-disable no-unused-vars */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordField = forwardRef(
  (
    { label, name, value, onChange, showPassword, setShowPassword, error },
    ref
  ) => (
    <div className="mb-4 w-100 position-relative">
      <label className="form-label text-muted text-start w-100" htmlFor={name}>
        {label}
      </label>
      <div className="position-relative w-100">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control border rounded-3 focus:outline-none focus:ring-2 focus:ring-caramel-caramel pe-5"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
          required
          aria-invalid={!!error}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="btn position-absolute end-0 top-50 translate-middle-y me-2 p-0 border-0 bg-transparent"
        >
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </button>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
);
PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  error: PropTypes.string,
};

PasswordField.displayName = "PasswordField";
export default PasswordField;
