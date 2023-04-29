import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualituesList";
import Table from "./table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserTable = ({ users, onFolow, onSort, selectedSort, onDelete }) => {
  const columns = {
    name: { path: "name", name: "Имя", classPath: "bi-caret-up-fill", id: "name", component: (user) => (<Link to={`/users/` + user._id}>{ user.name }</Link>) },
    qualities: { name: "Качество", component: (user) => (<QualitiesList qualities={user.qualities}/>), classPath: "bi" },
    professions: { path: "profession.name", name: "Профессия", id: "profession", classPath: "bi" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз", id: "completedMeetings", classPath: "bi" },
    rate: { path: "rate", name: "Оценка", id: "rate", classPath: "bi" },
    bookmark: { path: "bookmark", name: "Избранное", component: (user) => (<BookMark status={user.bookmark} funct={onFolow} id={user._id}/>), id: "bookmark", classPath: "bi" },
    delete: { component: (user) => (<button className="btn btn-danger" type="submit" onClick={() => onDelete(user._id)}> delete </button>), id: "delete", classPath: "bi" }
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
  selectedSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default UserTable;
