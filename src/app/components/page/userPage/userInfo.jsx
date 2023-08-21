import React from "react";
import UserBody from "../../common/userBody";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUserById, getUsersList } from "../../../store/users";

const UserInfo = ({ id }) => {
    const users = useSelector(getUsersList());
    const user = useSelector(getUserById(id));
    if (user) {
        return <UserBody user={user} users={users} />;
    }
    return "loading...";
};

UserInfo.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserInfo;
