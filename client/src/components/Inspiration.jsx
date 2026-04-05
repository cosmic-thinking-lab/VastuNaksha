import React, { useState, useEffect } from 'react';
import './Inspiration.css';

import grid1 from '../assets/inspiration/grid-1.jpg';
import grid2 from '../assets/inspiration/grid-2.jpg';
import grid3 from '../assets/inspiration/grid-3.jpg';
import grid4 from '../assets/inspiration/grid-4.jpg';
import grid5 from '../assets/inspiration/grid-5.jpg';
import grid6 from '../assets/inspiration/grid-6.jpg';
import grid7 from '../assets/inspiration/grid-7.jpg';
import grid8 from '../assets/inspiration/grid-8.png';
import grid9 from '../assets/inspiration/grid-9.jpg';

// Imported images for slider
const sliderData = [
    { id: 1, title: "Modern Facade", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60" },
    { id: 2, title: "Elegant Interior", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=60" },
    { id: 3, title: "Luxury Living", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60" },
    { id: 4, title: "Spacious Design", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=60" },
    { id: 5, title: "Architectural Beauty", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60" },
    { id: 6, title: "Contemporary Home", image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&auto=format&fit=crop&q=60" },
    { id: 7, title: "Vastu Compliant", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=60" },
    { id: 8, title: "Modern Living", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&auto=format&fit=crop&q=60" }
];

const gridData = [
    { id: 1, image: grid1 },
    { id: 2, image: grid2 },
    { id: 3, image: grid3 },
    { id: 4, image: grid4 },
    { id: 5, image: grid5 },
    { id: 6, image: grid6 },
    { id: 7, image: grid7 },
    { id: 8, image: grid8 },
    { id: 9, image: grid9 },
];

const Inspiration = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="inspiration" className="inspiration-section">
            <div className="container">
                <div className="section-header">
                    <h2>Inspiration</h2>
                </div>
                <div className="inspiration-container">
                    {/* Left Column: Big Slider */}
                    <div className="inspiration-slider-wrapper">
                        <div
                            className="slider-track"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {sliderData.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="slider-slide"
                                >
                                    <img src={slide.image} alt={slide.title} className="slider-img" />
                                    <div className="slider-overlay">
                                        <h3 className="slider-title">{slide.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Scrollable Grid */}
                    <div className="inspiration-grid-wrapper">
                        <div className="inspiration-grid">
                            {gridData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="grid-item animate-fade-in-up"
                                    style={{ animationDelay: `${0.1 * index}s` }}
                                >
                                    <img src={item.image} alt="Inspiration" className="grid-img" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inspiration;
