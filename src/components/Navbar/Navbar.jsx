import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import { useEffect } from "react";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const pathName = window.location.pathname;
    const path = pathName === "/" ? 'home' : pathName.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    switch (pathName) {
        case "/":
            console.log('home');
        //     // styles.home
            break;
        case "/login":
            // styles.login;
            console.log('login');
            break;
        case "/register": 
            // styles.register;
            console.log('register');
            break;
        default:
            console.log('no such pathname exists');
    }

    // console.log(pathName);
    // console.log(activeItem)

    const navBar = user ? (
        <nav>
            <div>
                <Link  
                    className={styles.link} 
                    to="/" 
                >{user.username}
                </Link>
            </div>
            <div>
                <Link 
                    className={styles.link} 
                    to="/login" 
                    onClick={logout}
                >Logout
                </Link>
            </div>
        </nav>
    ) : (
        <nav>
            <div>
                <Link 
                    className={`${styles.link} ${activeItem}`} 
                    to="/" 
                    name="home" 
                >Home
                </Link>
            </div>
            <div>
                <Link 
                    className={styles.link} 
                    to="/login" 
                    name="login"
                >Login
                </Link>
            </div>
            <div>
                <Link 
                    className={`${styles.link} ${styles.test}`} 
                    to="/register" 
                    name="register"
                >Register
                </Link>
            </div>
        </nav>
    );

    return (
        navBar
    );
};

export default Navbar;
