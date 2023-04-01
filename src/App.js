import React, { useState, useEffect } from "react";
import API from "./API";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import Pagination from "./components/pagiantion";
import { paginate } from "./utils/paginate";
import GroupList from "./components/groupList";
function App() {
  const [users, setUsers] = useState();
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [profession, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [remout, setRemout] = useState();
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
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
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
              : (<table className="table">
                  <thead>
                      <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                        <Users
                        users={userCrop}
                        func={handleDelete}
                        onFolow={handleToggleBookMark}
                        />
                    </tbody>
                </table>
                )}
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
}

export default App;
