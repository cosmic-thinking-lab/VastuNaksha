import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-new">
            <div className="container footer-container">
                {/* Left Section: Logo and Motto */}
                <div className="footer-column footer-brand">
                    <div className="footer-logo-container">
                        <h1 className="footer-logo-text">VASTUNAKSHA</h1>
                        <span className="footer-logo-sub">.online</span>
                        <div className="footer-logo-line">
                            <span className="line"></span>
                            <span className="dot"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                    <p className="footer-motto">
                        Harmonizing lives through ancient wisdom and modern precision since 2008.
                    </p>
                </div>

                {/* Middle Section: Connect With Us */}
                <div className="footer-column footer-connect">
                    <h3>Connect With Us</h3>
                    <ul className="footer-contact-list">
                        <li>
                            <svg className="footer-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>HSR- Layout, Bengaluru, Karnataka</span>
                        </li>
                        <li>
                            <svg className="footer-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>99344 44997</span>
                        </li>
                        <li>
                            <svg className="footer-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <a href="mailto:connect@vastunaksha.online">connect@vastunaksha.online</a>
                        </li>
                        <li>
                            <svg className="footer-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <a href="https://www.vastunaksha.online" target="_blank" rel="noopener noreferrer">www.vastunaksha.online</a>
                        </li>
                    </ul>
                </div>

                {/* Right Section: Copyright and Credits */}
                <div className="footer-column footer-credits">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} VastuNaksha. All rights reserved.
                    </p>
                    <p className="footer-tagline-words">
                        Design | Prosperity | Harmony
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
