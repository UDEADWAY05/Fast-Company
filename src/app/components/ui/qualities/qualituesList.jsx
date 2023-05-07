import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualite";

const QualitiesList = ({ qualities }) => {
  return <> {qualities.map((qualite) => (
    <Qualitie {...qualite} key={qualite._id} />
  ))}</>;
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
