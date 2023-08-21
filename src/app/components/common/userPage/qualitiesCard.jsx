import React from "react";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const QualitiesCard = ({ qualities }) => {
    return <div className="card mb-3">
        <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center position-relative">
                <h4>Qualities</h4>
                <Qualities qualitiesId={qualities} />
            </div>
        </div>
    </div>;
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesCard;
