import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name, objectOn }) => {
  if (typeof value === "object") {
    value = value.name;
  };
  const handleChange = ({ target }) => {
    console.log(target.value)
    if (objectOn === true) {
      const unkey = Object.keys(options).filter((quo) => { return options[quo].label === target.value; });
      onChange({ name: target.name, value: options[unkey]._id });
    } else {
      const unkey = Object.keys(options).filter((quo) => { return options[quo].label === target.value; });
      console.log(options[unkey].value)
      onChange({ name: target.name, value: options[unkey].value });
    //   onChange({ name: target.name, value: target.value });
    };
  };

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
//   const optionArray =
//     !Array.isArray(options) && typeof (options) === "object"
//       ? (Object.keys(options).map(optionName => ({
//           name: options[optionName].name,
//           _id: options[optionName]._id
//         })))
//       : options;
  return <div className="mb-4">
      <label htmlFor={name} className="form-label">{ label }</label>
        <select className={getInputClasses()} name={name} id={name} value={value} onChange={handleChange}>
          <option disabled value="">{defaultOption}</option>
            {options && options.map(option => <option
              value={option.label}
              key={option.label}
            >
              {option.label}
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
  name: PropTypes.string,
  objectOn: PropTypes.bool
};

export default SelectField;
