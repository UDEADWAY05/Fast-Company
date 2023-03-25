import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, funct, id }) => {
  const classIcons = status === true ? "bookmark-heart-fill" : "bookmark";
  return (
   <button onClick={() => funct(id)}>
     <i className={"bi bi-" + classIcons}></i>
   </button>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  funct: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default BookMark;
