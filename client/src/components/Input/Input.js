import React from "react";
import './Input.scss'

const Input = ({ text, check, placeholder, value, onChange, type, name }) => {
  return (
    <label className="Input">
      <p>{text}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      />
      {check ? (
        <p style={{ fontsize: "20px", color: "red" }}>El campo es requerido</p>
      ) : (
        ""
      )}
    </label>
  );
};

export default Input;