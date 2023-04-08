import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualituesList";
import Table from "./table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UserTable = ({ users, onFolow, onSort, selectedSort, onUsers, onDelete }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: { name: "Качество", component: (user) => (<QualitiesList qualities={user.qualities}/>) },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: { path: "bookmark", name: "Избранное", component: (user) => (<BookMark status={user.bookmark} funct={onFolow} id={user._id}/>) },
    delete: { component: (user) => (<button className="btn btn-danger" type="submit" onClick={() => onDelete(user._id)}> delete </button>) }
  };
  return (
    <Table onSort={onSort} selectedSort={selectedSort} columns={columns} onUsers={onUsers} users={users}>
      <TableHeader {...{ onSort, selectedSort, columns, onUsers, users }} />
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
