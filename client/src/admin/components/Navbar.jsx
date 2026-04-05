import React from 'react';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="VastuNaksha" className="logo-img" />
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
