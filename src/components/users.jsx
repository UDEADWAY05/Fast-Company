import React from "react";
import User from "./user";

const Users = ({ users , func, onFolow}) => {
    let users_el = users.map((user) =>
        <User user={user} funcFolow={onFolow} key={user._id} onFunc={func} />)
    return users_el
}


export default Users