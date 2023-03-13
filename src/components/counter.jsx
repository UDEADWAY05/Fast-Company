import React, { useState } from "react";
import API from "../API";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll())
    const hadleDelete = (useerId) => {
        const delButton = (id) => {
            console.log(id)
            
            setUsers((prevState) => prevState.filter(item=>item._id !== id))
            console.log(users)
            console.log(users.length)
        }
        return <>
            <table className="table">
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
                    {users.map((user, idx) => 
                    <tr id={idx}>
                        <td key="name">{user.name}</td>
                            <td key="qualities">
                                <table>
                                    <tbody>
                                        <tr>
                                        {user.qualities.map((qal) => {
                                        return <td className={'badge m-1 bg-'+ qal.color} >{qal.name}</td>    
                                        })}</tr>
                                    </tbody>
                                </table>
                            </td>
                        <td key="profession">{user.profession.name}</td>
                        <td key="exp">{user.completedMeetings}</td>
                            <td key="bal">{`${user.rate}` + '/5'}</td>
                            <td><button className="btn btn-danger" type="submit" onClick={() => delButton(user._id)}>delete</button></td>    
                    </tr>
                    
                )}                     
            </tbody>
            </table>
        </>
    }
    const renderPhrase = () => {
        const textPhrase = users.length > 0 ? (users.length > 4 ? `${users.length} человек тусанёт с тобой сегодня` : (users.length === 1 ? `${users.length} человек тусанёт с тобой сегодня` : `${users.length} человека тусанёт с тобой сегодня`)) : "Никто с тобой не тусанёт"
        const stylePhrase = "badge bg-" + `${users.length > 0 ? "primary": "danger" }`
        return <h2><span className={stylePhrase}>{textPhrase}</span></h2>
    }

    return <>
        {renderPhrase()}
        {hadleDelete()}
    </>
}

export default Users