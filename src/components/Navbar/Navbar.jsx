import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const pathName = window.location.pathname;
    const path = pathName === "/" ? "home" : pathName.substr(1);
    // const [activeItem, setActiveItem] = useState(path);

    // const handleClick = (e) => {
    //     console.log(e.target);
    // };

    const navBar = user ? (
        <nav>
            <div className={styles.home}>
                <Link to="/">{user.username}</Link>
            </div>
            <div className={styles.login}>
                <Link to="/login" onClick={logout}>Logout</Link>
            </div>
        </nav>
    ) : (
        <nav>
            <div className={styles.home}>
                <Link to="/">Home</Link>
            </div>
            <div className={styles.login}>
                <Link to="/login">Login</Link>
            </div>
            <div className={styles.login}>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );

    return (
        navBar
    );
};

export default Navbar;
