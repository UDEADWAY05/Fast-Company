import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, nameLab, onChange, error, value }) => {
  const handleChange = (e) => {
    onChange({ name: "content", value: e.target.value });
  };
  const getInputClasses = () => {
    return "form-control " + (error ? " is-invalid" : "");
  };
  return <>
    <div className="mb-4">
    <label htmlFor={nameLab}>{label}</label>
    <textarea onChange={handleChange} className={getInputClasses()} name="w3review" rows="3" value={value}></textarea>
    {error && <div className="invalid-feedback">
       ошибка {error}
    </div>}
    </div>
  </>;
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  nameLab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  value: PropTypes.string.isRequired
};

export default TextAreaField;
