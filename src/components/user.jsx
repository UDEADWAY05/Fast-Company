import React from "react";
import Qualitie from "./qualite";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, funcFolow, onFunc }) => {
  return (
        <>
            <tr>
              <td key="name">{user.name}</td>
              <td key="qualities">
                {user.qualities.map((qualite) => (
                    <Qualitie {...qualite} key={qualite._id} />
                ))}
              </td>
              <td key="profession">{user.profession.name}</td>
              <td key="exp">{user.completedMeetings}</td>
              <td key="bal">{user.rate + "/5"}</td>
              <td>
                  <BookMark
                      status={user.bookmark}
                      funct={funcFolow}
                      id={user._id}
                  />
              </td>
              <td>
                  <button
                      className="btn btn-danger"
                      type="submit"
                      onClick={() => onFunc(user._id)}
                  >
                      delete
                  </button>
              </td>
          </tr>
      </>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  funcFolow: PropTypes.func.isRequired,
  onFunc: PropTypes.func.isRequired
};

export default User;
