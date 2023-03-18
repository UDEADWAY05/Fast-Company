import React from "react"

const SearchStatus = ({ length } ) => {
    const textPhrase = length > 0 ? (length > 4 ? `${length} человек тусанёт с тобой сегодня` : (length === 1 ? `${length} человек тусанёт с тобой сегодня` : `${length} человека тусанёт с тобой сегодня`)) : "Никто с тобой не тусанёт"
    const stylePhrase = `badge bg-${length > 0 ? "primary" : "danger"}`
    return <>
        < h2 > <span className={stylePhrase}>{textPhrase}</span></h2>
    </>
        
}

        
export default SearchStatus