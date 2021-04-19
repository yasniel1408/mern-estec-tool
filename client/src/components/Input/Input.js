import React from "react";
import "./Input.scss";

const Input = ({
  text,
  required,
  placeholder,
  value,
  onChange,
  type,
  name,
}) => {
  return (
    <div className="form-group Input">
      <label htmlFor={text}>{text}</label>
      <div className="input-group">
        <input
          type={type}
          className="form-control"
          id={text}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          required={required}
          aria-describedby={text}
          placeholder={`${placeholder}`}
        />
      </div>
      <div className="valid-feedback">Correcto!</div>
      <div className="invalid-feedback">
        Porfavor el campo no puede estar vacio.
      </div>
    </div>
  );
};

export default Input;
