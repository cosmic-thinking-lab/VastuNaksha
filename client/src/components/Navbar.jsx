import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoIcon from '../assets/logo-icon.png';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <img src={logoIcon} alt="Vastu Icon" className="logo-icon" />
                    <img src={logo} alt="VastuNaksha" className="logo-img" />
                </Link>

                <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="/#home" onClick={closeMenu}>Home</a></li>
                    <li><a href="/#inspiration" onClick={closeMenu}>Design</a></li>
                    <li><a href="/#pricing" onClick={closeMenu}>Pricing</a></li>
                    <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
                </ul>

                <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
