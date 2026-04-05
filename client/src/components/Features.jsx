import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Features.css';

const Features = () => {
    const navigate = useNavigate();
    const features = [
        {
            title: "Accurate Mapping",
            description: "Get precise orientation with modern tools"
        },
        {
            title: "Expert Vastu Insights",
            description: "Traditional knowledge meets digital accuracy."
        },
        {
            title: "Instant Reports",
            description: "Receive your Vastu report within minutes."
        }
    ];

    return (
        <section className="features">
            <div className="container">
                <h2 className="section-title">Why Vastunaksha.online?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card animate-fade-in-up"
                            style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                        >
                            <div className="feature-icon-placeholder"></div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <div className="features-button-container">
                    <button className="btn-check-direction" onClick={() => navigate('/check-direction')}>
                        Check Direction
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Features;
