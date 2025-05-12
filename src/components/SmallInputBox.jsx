import React from "react";

export const SmallInputBox = ({
  value,
  onChange,
  type = "text",
  name,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        width: "40px",
        background: "#ffffff",
        color: "#000000",
        border: "none",
      }}
    />
  );
};
