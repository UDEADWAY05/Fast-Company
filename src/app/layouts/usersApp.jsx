import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import UserInfo from "../components/page/userPage";
import UserForm from "../components/page/userEditPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";


const UsersApp = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId())
    return <>
        <UsersLoader>
            {userId ? (
                edit ?
                (userId === currentUserId 
                    ? <UserForm userId={userId} />
                    : history.push(`/users/${currentUserId}/edit`)
                    ) : (<UserInfo id={userId} />)
                ) : (
                <UsersListPage/>
            )}
        </UsersLoader>
    </>
};

export default UsersApp;
