import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/profession";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return (<p>Loading...</p>);
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
