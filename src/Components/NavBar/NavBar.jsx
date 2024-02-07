import "../../Styles/global.css";
import img1 from "../../assets/react.svg";

import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';

const NavBar = () => {
    const [HamShow, setHamShow] = useState(false);
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        console.log(Cookies.get('ext_name'),Cookies.get('email'));
        var isCooks = Cookies.get('ext_name');
        if(isCooks !== undefined){
            var email = Cookies.get('email');
            var userid = Cookies.get('userid');
            console.log("Make a get Request:"+email);
            // make a get request using the email address
            setLoggedIn(true)
        }
        
    },[]);

    const handleLogout = () => {
        // Clear cookies and reset state
        Cookies.remove('ext_name');
        Cookies.remove('email');
        Cookies.remove('loggedIn');
        setLoggedIn(false);
      };

    return (
        <>
            <section className="navbar-bg sticky-top navbar-light bg-light NavBarSection">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container">
                        <Link to="/">
                            <i>
                                <img
                                    src={img1}
                                    alt="company-logo"
                                    height="65px"
                                    className="navbar-brand"
                                />
                            </i>
                        </Link>
                        <button
                            className="navbar-toggler "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => {
                                setHamShow(!HamShow);
                            }}
                        >
                            <i className="hamburger">
                                <FontAwesomeIcon icon={faBars} />
                            </i>
                        </button>
                        <div
                            className={`collapse navbar-collapse ${HamShow ? "show" : ""}   `}
                        >
                            <ul className="navbar-nav ms-5 mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        exact="true"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        // activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/allproduct"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Product Listing
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/cartitems"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Cart
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink
                                        to="/itemsordered"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                            // handleLogout();
                                        }}
                                    >
                                            Items ordered
                                    </NavLink>
                                </li>
                            </ul>
                            {loggedIn ? 
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <NavLink
                                        to="/profile"
                                        exact="true"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        User Profile
                                    </NavLink>
                                </li>
                                </ul>
                            :
                            <>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        exact="true"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink
                                        to="/register"
                                        exact="true"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </ul>
                            
                            </>
                            }
                            
                        </div>
                    </div>
                </nav>
            </section>
        </>
    );
};

export default NavBar;
