import { Link } from 'react-router-dom';
import mandala from '../assets/hero-mandala.png';
import ExperienceIcon from '../assets/experience-icon.png';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <div className="hero-content animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                    <h1 className="hero-title">Your Trusted Vastu Floor Plan & Direction Analysis</h1>
                    <div className="hero-experience">
                        <span>1</span>
                        <span>5</span>
                        <span className="gap-more"> </span>
                        <span>Y</span>
                        <span>e</span>
                        <span>a</span>
                        <span>r</span>
                        <span>s</span>
                        <span className="gap"> </span>
                        <span className="gap"> </span>
                        <span>o</span>
                        <span>f</span>
                        <span className="gap"> </span>
                        <span className="gap"> </span>
                        <span>E</span>
                        <span>x</span>
                        <span>p</span>
                        <span>e</span>
                        <span>r</span>
                        <span>i</span>
                        <span>e</span>
                        <span>n</span>
                        <span>c</span>
                        <span>e</span>
                        <img src={ExperienceIcon} alt="Experience" className="experience-icon" />
                    </div>
                    <p className="hero-subtitle">
                        Get accurate Vastu reports and expert guidance – all online.<br />
                        Our advanced mapping system helps you understand the energy flow of your home or workplace.<br />
                        Receive personalized recommendations to improve harmony, prosperity, and well-being.<br />
                        Simple, quick, and designed for anyone looking to bring balance into their space.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</button>
                        <Link to="/brochure" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Brochure</Link>
                    </div>
                </div>
                <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <img src={mandala} alt="Vastu Mandala" className="hero-mandala-img" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
