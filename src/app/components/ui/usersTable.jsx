import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table, { TableBody, TableHeader } from "../common/table";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Profession from "./proffesion";

const UserTable = ({ users, onFolow, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя", classPath: "bi-caret-up-fill", id: "name", component: (user) => (<Link to={`/users/` + user._id}>{user.name}</Link>) },
        qualities: { name: "Качество", component: (user) => (<Qualities qualitiesId={user.qualities} />), classPath: "bi" },
        professions: { name: "Профессия", component: (user) => (<Profession id={user.profession} />), id: "profession", classPath: "bi" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз", id: "completedMeetings", classPath: "bi" },
        rate: { path: "rate", name: "Оценка", id: "rate", classPath: "bi" },
        bookmark: { path: "bookmark", name: "Избранное", component: (user) => (<BookMark status={user.bookmark} funct={onFolow} id={user._id} />), id: "bookmark", classPath: "bi" }
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} users={users}>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onFolow: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UserTable;
