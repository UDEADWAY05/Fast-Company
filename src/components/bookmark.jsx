import React from "react";

const BookMark = ({ status, funct, id}) => {
    let classIcons = status === true ? "bookmark-heart-fill" : "bookmark"
    return <button onClick={()=>funct(id)}><i className={"bi bi-" + classIcons}></i></button>
}

export default BookMark