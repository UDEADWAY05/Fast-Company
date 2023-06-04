import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualite";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualitiesId }) => {
  const { getQuality, isLoading } = useQualities();
  if (!isLoading) {
    const userQuality = qualitiesId.map((q) => {
      const qual = getQuality(q);
      return <Qualitie {...qual} key={qual._id} />;
    });
    return userQuality;
  }
  return <p>Loading...</p>;
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array
};

export default QualitiesList;
