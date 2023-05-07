import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, onUsers, users, children }) => {
  return (
    <table className="table">
      {children
        ? children
        : (
          <>
            <TableHeader {...{ onSort, selectedSort, columns, onUsers, users }} />
            <TableBody {...{ columns, data: users }} />
          </>
          )
      }
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  users: PropTypes.array,
  children: PropTypes.array
};

export default Table;
