import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualite";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesById, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualitiesId }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesById(qualitiesId));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (!isLoading) {
        const userQuality = qualitiesList.map((qual) => {
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
