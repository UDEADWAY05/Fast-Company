import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../../store/profession";
import { getCurrentUserId } from "../../../store/users";

const UserCard = ({ user }) => {
    const profession = useSelector(getProfessionById(user.profession));
    const currentUserId = useSelector(getCurrentUserId());
    const history = useHistory();
    const HandleSave = () => {
        history.push(history.location.pathname + "/edit");
    };
    return <div className="card mb-3">
        {currentUserId === user._id && <button onClick={HandleSave} className="position-absolute top-0 end-0 btn btn-light btn-sm">
            <i className="bi bi-gear"></i>
        </button>}
        <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center position-relative">
                <img src={user.image}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="150"
                />
                <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">{profession.name}</p>
                    <div className="text-muted">
                        <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                        <i className="bi bi-caret-up text-secondary" role="button"></i>
                        <span className="ms-2">{user.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
