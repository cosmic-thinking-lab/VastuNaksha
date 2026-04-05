import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="VastuNaksha" className="logo-img-footer" />
                </div>
                <div className="footer-copyright">
                    © 2025 Vastunaksha. All rights reserved • Made with care
                </div>
                <div className="footer-links">
                    <a href="#privacy">Privacy</a>
                    <a href="#tcs">T&Cs</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
