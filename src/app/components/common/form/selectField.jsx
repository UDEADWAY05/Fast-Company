import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name, objectOn }) => {
    if (typeof value === "object") {
        value.name ? value = value.name : value = value.label;
    };
    const handleChange = ({ target }) => {
        const unkey = Object.keys(options).filter((quo) => { return options[quo].label === target.value; });
        // value = options[unkey].label
        onChange({ name: target.name, value: options[unkey] });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    return <div className="mb-4">
        <label htmlFor={name} className="form-label">{label}</label>
        <select className={getInputClasses()} name={name} id={name} value={value} onChange={handleChange}>
            <option value="" disabled>{defaultOption}</option>
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
