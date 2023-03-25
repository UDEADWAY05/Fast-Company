import React, { useState } from "react";
import API from "./API";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import Pagination from "./components/pagiantion";
import { paginate } from "./utils/paginate";

function App() {
    const [users, setUsers] = useState(API.users.fetchAll());
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        console.log("page:", pageIndex);
        setCurrentPage(pageIndex);
    };

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((item) => item._id !== id));
    };
    const handleToggleBookMark = (id) => {
        const p = users.filter((user) => user._id === id);
        let index = users.findIndex((i) => i === p[0]);
        users[index].bookmark === true
            ? (users[index].bookmark = false)
            : (users[index].bookmark = true);
        setUsers([...users]);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <div>
            <SearchStatus length={count} />
            {count === 0 ? (
                ""
            ) : (
                <>
                    <table className="table">
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
                </>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default App;
