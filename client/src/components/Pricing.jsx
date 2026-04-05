import React from 'react';
import './Pricing.css';

const Pricing = () => {
    const plans = [
        {
            name: "Basic Vastu Plan",
            bestFor: "Small homes / budget planning / vastu guidance only",
            price: "₹15,000",
            sqftPrice: "₹8 / sqft",
            sqftOld: "₹15 / sqft",
            includes: [
                "Vastu summary report (PDF)",
                "Simple 2D layout sketch (1 revision)",
                "Room-by-room vastu notes",
                "Directional energy analysis",
                "SVG / PDF output"
            ],
            features: [
                { name: "Floor Plan (2D)", included: true },
                { name: "Vastu Design", included: true },
                { name: "Airflow Direction Analysis", included: true },
                { name: "Front House Direction Guidance", included: true },
                { name: "Basic Electrical Points", included: true },
                { name: "Plumbing / Pipeline Design", included: false },
                { name: "Structural Cross-Section", included: false },
                { name: "3D Elevation", included: false },
                { name: "3D Interior / Exterior", included: false },
                { name: "High-quality Rendering", included: false }
            ]
        },
        {
            name: "Standard Vastu + Design Plan",
            bestFor: "Medium homes / construction-ready planning",
            price: "₹35,000",
            sqftPrice: "₹20 / sqft",
            sqftOld: "₹35 / sqft",
            includes: [
                "Detailed vastu report",
                "Optimized 2D floor plan",
                "Up to 2 revisions",
                "Room-by-room functional layout",
                "Electrical + plumbing guidance",
                "SVG, PDF & DWG files"
            ],
            features: [
                { name: "Floor Plan (Optimized 2D)", included: true },
                { name: "Advanced Vastu Design", included: true },
                { name: "Airflow & Ventilation Analysis", included: true },
                { name: "Front Elevation Concept", included: true },
                { name: "Electrical Layout", included: true },
                { name: "Pipeline / Plumbing Design", included: true },
                { name: "Structural Cross-Section", included: false },
                { name: "Full 3D Interior / Exterior", included: false },
                { name: "Photorealistic Rendering", included: false }
            ]
        },
        {
            name: "Premium Vastu Floor Design Plan",
            bestFor: "Luxury homes / turnkey design / visual clarity",
            price: "₹80,000",
            sqftPrice: "₹32 / sqft",
            includes: [
                "Complete vastu + architectural planning",
                "Detailed working drawings",
                "Unlimited minor revisions",
                "3D visualization support",
                "Contractor-ready documents",
                "All export formats"
            ],
            features: [
                { name: "Detailed Floor Plan", included: true },
                { name: "Complete Vastu Design", included: true },
                { name: "Airflow, Light & Energy Analysis", included: true },
                { name: "Front House & Elevation Design", included: true },
                { name: "Electrical & Plumbing Layout", included: true },
                { name: "Structural Cross-Section", included: true },
                { name: "3D Elevation", included: true },
                { name: "3D Interior & Exterior Design", included: true },
                { name: "High-quality Rendering", included: true }
            ]
        }
    ];

    return (
        <section className="pricing" id="pricing">
            <div className="container">
                <h2 className="section-title">Pricing</h2>
                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="pricing-card animate-fade-in-up"
                            style={{ animationDelay: `${0.3 * (index + 1)}s` }}
                        >
                            <div className="active-badge">Active</div>

                            <div className="plan-header">
                                <h3 className="plan-name">{plan.name}</h3>
                                <p className="plan-best-for">Best for: {plan.bestFor}</p>
                                <div className="plan-price-main">{plan.price}</div>
                                <div className="plan-sqft-row">
                                    {plan.sqftOld && <span className="sqft-old">{plan.sqftOld}</span>}
                                    <span className="sqft-current">{plan.sqftPrice}</span>
                                </div>
                            </div>

                            <div className="plan-includes">
                                <h4>Includes</h4>
                                <ul>
                                    {plan.includes.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="plan-features-section">
                                <h4>Features</h4>
                                <ul className="plan-features">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className={feature.included ? 'included' : 'excluded'}>
                                            <span className="icon-wrapper">
                                                {feature.included ? (
                                                    <div className="check-circle">✓</div>
                                                ) : (
                                                    <span className="cross-text">✕</span>
                                                )}
                                            </span>
                                            {feature.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="btn-plan">
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
