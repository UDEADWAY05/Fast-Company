import React from "react";
import User from "./user";

const Users = ({ users , func, onFolow}) => {
    let users_el = users.map((user) => <tr >
        <User user={user} funcFolow={onFolow} />
        <td><button className="btn btn-danger" type="submit" onClick={() => func(user._id)}>delete</button></td>
    </tr>)
    return users_el
}


export default Users