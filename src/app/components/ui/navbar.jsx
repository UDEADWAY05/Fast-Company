import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/main">
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn
                        ? <NavProfile />
                        : <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
