import React from "react";
import PropTypes from "prop-types";

const RafioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (<div className="mb-4">
        <label className="form-label">{label}</label>
        <div>
            {options.map((option) => (
                <div key={option.name + "_" + option.value} className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        checked={option.value === value}
                        value={option.value}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">{option.name}</label>
                </div>
            ))}
        </div>
    </div>);
};

RafioField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RafioField;
