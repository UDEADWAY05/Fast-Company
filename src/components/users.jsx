import React, { useState, useEffect } from "react";
import API from "../API";
import SearchStatus from "./searchStatus";
import Pagination from "./pagiantion";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
  const [users, setUsers] = useState();
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [profession, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [remout, setRemout] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setUsers([...users]);
  };
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    setUsers([...users]);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id));
  };
  const handleToggleBookMark = (id) => {
    const p = users.filter((user) => user._id === id);
    const index = users.findIndex((i) => i === p[0]);
    users[index].bookmark === true
      ? (users[index].bookmark = false)
      : (users[index].bookmark = true);
    setUsers([...users]);
  };
  useEffect(() => {
    users === undefined ? "" : addFunction();
  }, [users]);
  function addFunction() {
    const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
      setUsers([...users]);
    };
    setRemout(
        <div>
            <div className="d-flex">
            {profession && <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                items={profession}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
                />
                <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
            </div>}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
            {count === 0
              ? ("")
              : (<UserTable
                 users = {userCrop}
                 onFolow = {handleToggleBookMark}
                 onSort={handleSort}
                 selectedSort={sortBy}
                 onUsers = {setUsers}
                 onDelete={handleDelete}
                />)}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                />
                </div>
        </div>
    );
  };
  return remout;
};

export default Users;
