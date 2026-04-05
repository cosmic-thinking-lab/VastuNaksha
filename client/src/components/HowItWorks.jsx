import React from 'react';
import vastuShastraWheel from '../assets/vastu-shastra-color-wheel-scaled.png';
import patternCircle from '../assets/pattern-circle.png';

import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      title: "Upload",
      description: "Upload your sketches, photos, or existing architectural plans to get started. Our team reviews every detail to understand your layout requirements and goals."
    },
    {
      title: "Drafting",
      description: "We create a precise, scaled floor plan and accurate maps/Vastu zones. Each space is analyzed and refined to ensure balance, harmony, and functional flow."
    },
    {
      title: "Delivery",
      description: "You receive a complete package including the Vastu report, SVG, and high-res design files. We also offer revisions so you can request changes until you're fully satisfied."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container how-container">
        <div className="how-image">
          <img src={patternCircle} alt="" className="how-pattern-bg" />
          <img src={vastuShastraWheel} alt="Vastu Analysis Chart" className="how-graphic-img" />
        </div>
        <div className="how-content">
          <h2 className="section-title-left">How it works</h2>
          <div className="steps-list">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
