import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
        {
            text: "The platform's custom design has accelerated our workflow and boosted team productivity by 40%. The automated features are game changing.",
            author: "Rajesh Kumar",
            role: "Project Manager",
            company: "TechBuild India",
            image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=D4A373&color=fff&size=80"
        },
        {
            text: "Simply amazing customer support and powerful tools. The analysis was precise and actionable. Helped us fix our house plan before making costly mistakes.",
            author: "Sunita Gupta",
            role: "CEO & Founder",
            company: "Modern Living",
            image: "https://ui-avatars.com/api/?name=Sunita+Gupta&background=D4A373&color=fff&size=80"
        },
        {
            text: "Seamless integration into our existing tools made this transition effortless. The real-time collaboration features have improved our remote work greatly.",
            author: "Vikram Singh",
            role: "Operations Director",
            company: "Global Corp",
            image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=D4A373&color=fff&size=80"
        },
        {
            text: "VastuNaksha helped me visualize the energy flow perfectly. The report was detailed and easy to understand for my clients.",
            author: "Ananya Sharma",
            role: "Architect",
            company: "Sharma Designs",
            image: "https://ui-avatars.com/api/?name=Ananya+Sharma&background=D4A373&color=fff&size=80"
        }
    ];

    // Duplicate list to create seamless loop
    const marqueeReviews = [...reviews, ...reviews, ...reviews];

    return (
        <section className="testimonials">
            <div className="container-fluid">
                <div className="testimonials-header">
                    <h2 className="section-title">Testimonials</h2>
                    <p className="section-desc">“VastuNaksha helped us design spaces that feel balanced, purposeful, and truly harmonious.”</p>
                </div>
                <div className="testimonials-marquee">
                    <div className="testimonials-track">
                        {marqueeReviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <div className="stars">★★★★★</div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">
                                        <img src={review.image} alt={review.author} />
                                    </div>
                                    <div className="reviewer-details">
                                        <h4 className="reviewer-name">{review.author}</h4>
                                        <span className="reviewer-role">{review.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
