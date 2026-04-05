import React from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './Brochure.css';
import mandala from '../assets/hero-mandala.png';
import logo from '../assets/logo.png';
import heroImage from '../assets/inspiration/grid-6.jpg';
import Footer from '../components/Footer';

const Brochure = () => {
    const contentRef = React.useRef(null);

    const handleDownload = async () => {
        try {
            const element = contentRef.current;
            if (!element) return;

            // Scroll to top to ensure full capture
            window.scrollTo(0, 0);

            // Wait a moment for any scroll effects/repaints
            await new Promise(resolve => setTimeout(resolve, 500));

            // Show a visual indicator or loading state if needed
            const canvas = await html2canvas(element, {
                scale: 2, // Balance quality and file size
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff', // Ensure white background
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                x: 0,
                y: 0,
                onclone: (clonedDoc) => {
                    // Hide Return Home and Download buttons in PDF
                    const backLink = clonedDoc.querySelector('.back-link');
                    const downloadBtn = clonedDoc.querySelector('.header-download-btn');
                    const headerContainer = clonedDoc.querySelector('.brochure-header .container');

                    if (backLink) backLink.style.display = 'none';
                    if (downloadBtn) downloadBtn.style.display = 'none';
                    if (headerContainer) {
                        headerContainer.style.justifyContent = 'center';
                    }

                    // Fix Footer Logo Color manually using canvas manipulation
                    // This is more reliable than CSS filters for html2canvas
                    const originalLogo = document.querySelector('.footer-logo');
                    const clonedLogo = clonedDoc.querySelector('.footer-logo');

                    if (originalLogo && clonedLogo) {
                        try {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            canvas.width = originalLogo.naturalWidth;
                            canvas.height = originalLogo.naturalHeight;

                            // Draw original image
                            ctx.drawImage(originalLogo, 0, 0);

                            // Composite white color over the varying opacity of the image
                            ctx.globalCompositeOperation = 'source-in';
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);

                            // Reset composite operation
                            ctx.globalCompositeOperation = 'source-over';

                            // Replace src and remove filter
                            clonedLogo.src = canvas.toDataURL();
                            clonedLogo.style.filter = 'none';
                            clonedLogo.style.webkitFilter = 'none';
                        } catch (err) {
                            console.error('Failed to process logo:', err);
                        }
                    }

                    // Fix Hero Text Gradient issue
                    const heroH2 = clonedDoc.querySelector('.hero-content h2');
                    if (heroH2) {
                        heroH2.style.background = 'none';
                        heroH2.style.webkitBackgroundClip = 'initial';
                        heroH2.style.webkitTextFillColor = 'initial';
                        heroH2.style.color = '#333333';
                    }

                    // Remove box-shadows to prevent black bar artifacts
                    const elements = clonedDoc.querySelectorAll('*');
                    elements.forEach(el => {
                        el.style.boxShadow = 'none';
                        // Also fix text-shadows just in case
                        el.style.textShadow = 'none';
                    });
                }
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            const imgWidth = 210; // Fixed width (A4 standard) in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Initialize jsPDF with custom page size [width, height] to make it a single scrolling page
            const pdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [imgWidth, imgHeight]
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

            pdf.save('VastuNaksha-Brochure.pdf');
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('PDF download failed. Please try again.');
        }
    };

    return (
        <div className="brochure-page">
            <div ref={contentRef} className="brochure-printable-content">
                {/* Animated Header */}
                <header className="brochure-header">
                    <div className="container">
                        <Link to="/" className="back-link">← Return Home</Link>
                        <div className="header-title">
                            <img src={logo} alt="VastuNaksha Logo" className="header-logo" />
                            <div>
                                <span className="header-badge">Premium Collection</span>
                            </div>
                        </div>
                        <button className="header-download-btn" onClick={handleDownload}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Download PDF</span>
                        </button>
                    </div>
                </header>

                {/* Hero Section with Gradient */}
                <section className="brochure-hero">
                    <div className="hero-bg-pattern"></div>
                    <div className="container">
                        <div className="hero-layout">
                            <div className="hero-content">
                                <div className="hero-badge">✨ Transform Your Space ✨</div>
                                <h2>Ancient Wisdom Meets Modern Architecture</h2>
                                <p className="hero-tagline">Creating Harmonious Spaces for Over 15 Years</p>
                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">5000+</span>
                                        <span className="stat-label">Happy Families</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">15+</span>
                                        <span className="stat-label">Years Experience</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">100%</span>
                                        <span className="stat-label">Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hero-image">
                                <img src={heroImage} alt="Vastu Architecture" className="hero-main-img" />
                            </div>
                        </div>
                        <div className="floating-mandala">
                            <img src={mandala} alt="Vastu Mandala" />
                        </div>
                    </div>
                </section>

                {/* Expertise Section */}
                <section className="expertise-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Our Signature Expertise</h2>
                            <p>Where traditional Vastu Shastra meets contemporary architectural excellence</p>
                        </div>
                        <div className="expertise-grid">
                            <div className="expertise-card">
                                <div className="card-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Vastu Mastery</h3>
                                <p>Deep understanding of ancient Vastu principles applied to modern living spaces</p>
                            </div>
                            <div className="expertise-card">
                                <div className="card-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Architectural Precision</h3>
                                <p>Professional-grade floor plans and technical drawings for construction</p>
                            </div>
                            <div className="expertise-card">
                                <div className="card-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 12L19.07 4.92999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Design Innovation</h3>
                                <p>Creative solutions that balance aesthetics with Vastu compliance</p>
                            </div>
                            <div className="expertise-card">
                                <div className="card-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Digital Excellence</h3>
                                <p>Cutting-edge tools and technology for accurate measurements and analysis</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ancient Wisdom & Modern Science */}
                <section className="wisdom-science">
                    <div className="container">
                        <div className="wisdom-content">
                            <div className="wisdom-text">
                                <span className="wisdom-badge">The Philosophy</span>
                                <h2>Ancient Wisdom Meets Modern Science</h2>
                                <p>Vastu Shastra is more than just a set of rules; it is a sophisticated understanding of how energy (Prana) interacts with physical spaces. By aligning your environment with the magnetic field of the Earth and the path of the Sun, we help you tap into the natural rhythms of the universe.</p>
                                <div className="wisdom-points">
                                    <div className="point">
                                        <div className="point-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2v20M2 12h20M12 2l4 4M12 2L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="point-text">
                                            <h4>Magnetic Alignment</h4>
                                            <p>Utilizing Earth's geomagnetic field for mental clarity.</p>
                                        </div>
                                    </div>
                                    <div className="point">
                                        <div className="point-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="point-text">
                                            <h4>Solar Energy</h4>
                                            <p>Optimizing natural light for health and vitality.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wisdom-image-grid">
                                <div className="wisdom-box box-1">
                                    <div className="box-icon">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 21h18M12 21V5M12 5l-7 3M12 5l7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3>Balance</h3>
                                    <p>Harmonizing contrasting energies for peace</p>
                                </div>
                                <div className="wisdom-box box-2">
                                    <div className="box-icon">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 20V10M12 10l-4 4M12 10l4 4M4 4h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 20c0-2.209 1.791-4 4-4s4 1.791 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <h3>Growth</h3>
                                    <p>Aligning with prosperity and abundance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Five Elements (Pancha Bhoota) */}
                <section className="elements-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>The Five Elements</h2>
                            <p>The foundation of every harmonious space lies in the balance of Pancha Bhoota</p>
                        </div>
                        <div className="elements-grid">
                            <div className="element-card earth">
                                <div className="element-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <h3>Earth (Prithvi)</h3>
                                <p>Stability, groundedness, and patience. Governs the South-West.</p>
                            </div>
                            <div className="element-card water">
                                <div className="element-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Water (Jal)</h3>
                                <p>Purity, flow, and emotions. Governs the North-East.</p>
                            </div>
                            <div className="element-card fire">
                                <div className="element-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 0-2 1.5-5 1.5-5s4 3 4 7a5 5 0 0 1-10 0c0-1.66.67-3.13 1.75-4.17.44.47.75 1.07.75 1.67a2.5 2.5 0 0 1-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Fire (Agni)</h3>
                                <p>Transformation, energy, and will. Governs the South-East.</p>
                            </div>
                            <div className="element-card air">
                                <div className="element-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Air (Vayu)</h3>
                                <p>Movement, communication, and expansion. Governs the North-West.</p>
                            </div>
                            <div className="element-card space">
                                <div className="element-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <h3>Space (Akasha)</h3>
                                <p>Pure potential, listening, and intuition. Governs the Center.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Premium Services */}
                <section className="premium-services">
                    <div className="container">
                        <div className="section-header">
                            <h2>Choose Your Perfect Plan</h2>
                            <p>Tailored solutions for every dream and budget</p>
                        </div>
                        <div className="services-showcase">
                            <div className="service-tier bronze">
                                <div className="tier-badge">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Foundation
                                </div>
                                <h3>Starter Plan</h3>
                                <div className="price-display">
                                    <span className="currency">₹</span>
                                    <span className="amount">15,000</span>
                                </div>
                                <p className="tier-desc">Perfect for first-time homeowners and budget-conscious families</p>
                                <div className="features-list">
                                    <div className="feature">✓ Vastu Assessment Report</div>
                                    <div className="feature">✓ 2D Layout with Zones</div>
                                    <div className="feature">✓ Energy Flow Analysis</div>
                                    <div className="feature">✓ Directional Guidance</div>
                                </div>
                            </div>

                            <div className="service-tier silver popular">
                                <div className="tier-badge">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                    Harmony
                                </div>
                                <div className="popular-tag">Most Popular</div>
                                <h3>Complete Design</h3>
                                <div className="price-display">
                                    <span className="currency">₹</span>
                                    <span className="amount">35,000</span>
                                </div>
                                <p className="tier-desc">Ideal for growing families and construction projects</p>
                                <div className="features-list">
                                    <div className="feature">✓ Advanced Vastu Integration</div>
                                    <div className="feature">✓ Professional Floor Plans</div>
                                    <div className="feature">✓ Electrical & Plumbing Layout</div>
                                    <div className="feature">✓ Construction-Ready Files</div>
                                </div>
                            </div>

                            <div className="service-tier gold">
                                <div className="tier-badge">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Luxury
                                </div>
                                <h3>Masterpiece</h3>
                                <div className="price-display">
                                    <span className="currency">₹</span>
                                    <span className="amount">80,000</span>
                                </div>
                                <p className="tier-desc">Premium solution for luxury homes and commercial spaces</p>
                                <div className="features-list">
                                    <div className="feature">✓ Complete Architectural Mastery</div>
                                    <div className="feature">✓ 3D Visualization & Renders</div>
                                    <div className="feature">✓ Unlimited Revisions</div>
                                    <div className="feature">✓ Premium Consultation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Timeline */}
                <section className="process-timeline">
                    <div className="container">
                        <div className="section-header">
                            <h2>Your Journey to Perfect Space</h2>
                            <p>Our proven 5-step process ensures exceptional results</p>
                        </div>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-marker">1</div>
                                <div className="timeline-content">
                                    <h3>Discovery Call</h3>
                                    <p>Share your vision, requirements, and site details with our expert consultants</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker">2</div>
                                <div className="timeline-content">
                                    <h3>Vastu Analysis</h3>
                                    <p>Comprehensive evaluation using traditional principles and modern measurement tools</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker">3</div>
                                <div className="timeline-content">
                                    <h3>Custom Design</h3>
                                    <p>Personalized architectural plans optimized for Vastu compliance and functionality</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker">4</div>
                                <div className="timeline-content">
                                    <h3>Refinement</h3>
                                    <p>Collaborative revision process to ensure every detail meets your expectations</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker">5</div>
                                <div className="timeline-content">
                                    <h3>Final Delivery</h3>
                                    <p>Complete package with all files, documentation, and lifetime support included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Portfolio Highlights */}
                <section className="portfolio-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Architectural Mastery</h2>
                            <p>A glimpse into our diverse portfolio of Vastu-compliant designs</p>
                        </div>
                        <div className="portfolio-grid">
                            <div className="portfolio-item">
                                <div className="portfolio-image">
                                    <img src={heroImage} alt="Luxury Villa Design" />
                                    <div className="portfolio-overlay">
                                        <h3>Royal Villa</h3>
                                        <span>North-Facing Excellence</span>
                                    </div>
                                </div>
                            </div>
                            <div className="portfolio-item">
                                <div className="portfolio-image">
                                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60" alt="Modern Apartment" />
                                    <div className="portfolio-overlay">
                                        <h3>Zen Apartment</h3>
                                        <span>Urban Vastu Solution</span>
                                    </div>
                                </div>
                            </div>
                            <div className="portfolio-item">
                                <div className="portfolio-image">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=60" alt="Commercial Space" />
                                    <div className="portfolio-overlay">
                                        <h3>Corporate Hub</h3>
                                        <span>Prosperity Design</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>

            {/* Download CTA */}
            <section className="download-cta">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2>Get Your Complete Digital Brochure</h2>
                            <p>Download our comprehensive guide with detailed service information, pricing, and portfolio samples</p>
                            <button className="premium-download-btn" onClick={handleDownload}>
                                <span className="btn-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                                Download PDF Brochure
                                <span className="btn-arrow">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <polyline points="7,7 17,7 17,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                            <div className="cta-footer">
                                <p>Ready to transform your space? <Link to="/" onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Start your project today</Link></p>
                            </div>
                        </div>
                        <div className="cta-visual">
                            <div className="floating-elements">
                                <div className="element element-1">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="element element-2">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="element element-3">
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Brochure;