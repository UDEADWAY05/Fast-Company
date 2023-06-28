import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import UserInfo from "../components/page/userPage";
import UserForm from "../components/page/userEditPage";
import UserProvider from "../hooks/useUsers"; 
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const UsersApp = () => {
  const params = useParams();
  const {currentUser} = useAuth()
  const { userId } = params;
  const history = useHistory()
  const { edit } = params;
    return <>
      <UserProvider>
        {userId ? (
          edit ?
            (userId === currentUser._id 
                ? <UserForm userId={userId} />
                : history.push(`/users/${currentUser._id}/edit`)
            ) : (<UserInfo id={userId} />)
        ) : (
          <UsersListPage/>
        )}
      </UserProvider>
    </>
};

export default UsersApp;
