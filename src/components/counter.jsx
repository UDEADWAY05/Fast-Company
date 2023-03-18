import React, { useState } from "react";
import API from "../API";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll())
    const handleDelete = (id) => {           
        setUsers((prevState) => prevState.filter(item=>item._id !== id))
    }
    const renderPhrase = () => {
        const textPhrase = users.length > 0 ? (users.length > 4 ? `${users.length} человек тусанёт с тобой сегодня` : (users.length === 1 ? `${users.length} человек тусанёт с тобой сегодня` : `${users.length} человека тусанёт с тобой сегодня`)) : "Никто с тобой не тусанёт"
        const stylePhrase = `badge bg-${users.length > 0 ? "primary" : "danger"}`
        const tableEl = () => {
            return <> <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
                    {users.map((user) => 
                    <tr id={user._id}>
                        <td key="name">{user.name}</td>
                            <td key="qualities">                                        
                                {user.qualities.map((qal) => {
                                return <span className={'badge m-1 bg-'+ qal.color} >{qal.name}</span>    
                                })}
                            </td>
                        <td key="profession">{user.profession.name}</td>
                        <td key="exp">{user.completedMeetings}</td>
                            <td key="bal">{user.rate + '/5'}</td>
                            <td><button className="btn btn-danger" type="submit" onClick={() => handleDelete(user._id)}>delete</button></td>    
                    </tr>
                    
                )}                     
            </tbody>
            </table></>
        }
        return <>
            <h2><span className={stylePhrase}>{textPhrase}</span></h2>
            {users.length === 0? "" : tableEl()}
        </>
    }

    return <>
        {renderPhrase()}
    </>
}

export default Users
