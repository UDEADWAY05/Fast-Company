import React from "react";
import PropTypes from "prop-types";

const FindInputComp = ({ value, onChange }) => {
    return <input className="form-control" value={value} onChange={onChange} placeholder="Search..."></input>;
};

FindInputComp.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default FindInputComp;
