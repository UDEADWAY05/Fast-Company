import React from "react";

const Qualitie = ({ color, name, _id }) => {
     let p = <span className={'badge m-1 bg-' + color} key={_id}> {name}</span>
    return p
}

export default Qualitie