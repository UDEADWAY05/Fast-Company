import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionArray =
    !Array.isArray(options) && typeof (options) === "object"
        ? (Object.keys(options).map(optionName => ({
            label: options[optionName].name,
            value: options[optionName]._id
        })))
        : options;
    const handleChange = (value) => {
        console.log(value);
        value = value.map((peop) => {
            const unkey = Object.keys(options).filter((quo) => { return options[quo].label === peop.label; });
            console.log(options[unkey]);
            return options[unkey].value;
        });
        onChange({ name, value });
    };
    return <div className="mb-4">
        <label className="form-label">{ label }</label>
        <Select
            isMulti
            closeMenuOnSelect={false}
            defaultValue={defaultValue}
            options={optionArray}
            classNamePrefix="select"
            className="basic-multi-select"
            onChange={handleChange}
            name={name}
        />
    </div>;
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
