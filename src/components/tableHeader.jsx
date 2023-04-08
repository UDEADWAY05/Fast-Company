import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, onUsers, selectedSort, columns, users }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort((selectedSort) => ({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" }));
      onUsers([...users]);
    } else {
      onSort({ path: item, order: "asc" });
      onUsers([...users]);
    }
  };
  return <thead>
    <tr>
      { Object.keys(columns).map((column) => {
        return <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
          </th>;
      })}
    </tr>
  </thead>;
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
