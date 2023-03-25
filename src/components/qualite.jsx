import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
  const p = (
    <span className={"badge m-1 bg-" + color} key={_id}>
      {" "}
      {name}
    </span>
  );
  return p;
};

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default Qualitie;
