import React, { useState, useEffect } from "react";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagiantion";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import FindInputComp from "../../ui/findInpt";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/profession";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
  const pageSize = 12;
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const currentUserId = useSelector(getCurrentUserId())
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [filterFind, setFilterFind] = useState("");
  const users = useSelector(getUsersList());
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setFilterFind("");
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleToggleBookMark = (id) => {
    // const p = users.filter((user) => user._id === id);
    // const index = users.findIndex((i) => i === p[0]);
    // users[index].bookmark === true
    //   ? (users[index].bookmark = false)
    //   : (users[index].bookmark = true);
    // setUsers([...users]);
  };
  const handleFind = (e) => {
    setSelectedProf();
    setFilterFind(e.target.value);
  };
  if (users && users[0] !== undefined) {
    function filterUsers(data) {
        let filteredUsers;
        if (selectedProf || filterFind) {
        if (selectedProf) {
            console.log(selectedProf)
            filteredUsers = data.filter((user) => user.profession === selectedProf._id);
        } else if (filterFind) {
            filteredUsers = users.filter((user) => user.name.includes(filterFind));
        }
        } else {
        filteredUsers = users;
        }
        return filteredUsers.filter(user => {
           return user._id !== currentUserId
        })
    }
    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return <div>
            <div className="d-flex">
            {professions && !professionsLoading && <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
                />
                <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
            </div>}
            <div className="d-flex flex-column">
            <SearchStatus length={count} />
            <FindInputComp value={filterFind } onChange={handleFind} />
            {count === 0
              ? ("")
              : (<UserTable
                 users = {userCrop}
                 onFolow = {handleToggleBookMark}
                 onSort={handleSort}
                 selectedSort={sortBy}
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
        </div>;
  };
  return "Loading...";
};

export default UsersListPage;
