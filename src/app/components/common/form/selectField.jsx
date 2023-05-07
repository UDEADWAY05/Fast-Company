import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
    if (typeof value === "object") {
        value = value.name
    }
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
  const optionArray =
    !Array.isArray(options) && typeof (options) === "object"
      ? (Object.keys(options).map(optionName => ({
          name: options[optionName].name,
          _id: options[optionName]._id
        })))
      : options;
  return <div className="mb-4">
      <label htmlFor={name} className="form-label">{ label }</label>
        <select className={getInputClasses()} name={name} id={name} value={value} onChange={handleChange}>
          <option disabled value="">{defaultOption}</option>
            {optionArray && optionArray.map(option => <option
              value={option.value}
              key={option.name}
            >
              {option.name}
          </option>)}
        </select>
    {error && <div className="invalid-feedback">
        {error}
    </div>}
  </div>;
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string
};

export default SelectField;