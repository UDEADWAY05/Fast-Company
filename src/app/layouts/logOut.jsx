import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const LogOut = () => {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
    }, []);
    return <h1>Logout</h1> ;
}
 
export default LogOut;