import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import UserInfo from "../components/page/userPage";
import UserForm from "../components/ui/userform";
import UserProvider from "../hooks/useUsers";

const UsersApp = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;
    return <>
      <UserProvider>
        {userId ? (
          edit ?
            <UserForm userId={userId} />
            : <UserInfo id={userId} />
        ) : (
          <UsersListPage/>
        )};
      </UserProvider>
    </>
};

export default UsersApp;
