/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ label, value, onChange, error }) {
  return (
    <div className="mb-4 w-100 relative">
      <label className="form-label" htmlFor="phone">
        {label}
      </label>
      <PhoneInput
        country={"ke"}
        value={value}
        onChange={onChange}
        inputProps={{
          required: true,
          className:
            "form-control mt-1 w-100 p-2 border rounded focus-ring-2 focus-ring-caramel-caramel",
        }}
        masks={{ ke: "... ... ..." }}
        containerStyle={{ width: "100%" }}
        inputStyle={{ width: "100%", padding: "48px" }}
        buttonStyle={{
          position: "absolute",
          top: "50%",
          left: "8px",
          transform: "translateY(-50%)",
        }}
      />
      {error && (
        <em className="form-error text-danger invalid-feedback">{error}</em>
      )}
    </div>
  );
}
