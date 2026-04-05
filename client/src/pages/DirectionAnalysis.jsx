import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './DirectionAnalysis.css';
import compassImg from '../assets/compass-final.png';
// Only keeping the compassImg import for now as central element.

const DirectionAnalysis = () => {
    const [heading, setHeading] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [error, setError] = useState('');
    const [sensorData, setSensorData] = useState({ alpha: null, beta: null, gamma: null });

    useEffect(() => {
        // cleanup on unmount
        return () => {
            if (window.removeEventListener) {
                window.removeEventListener('deviceorientation', handleOrientation);
                window.removeEventListener('deviceorientationabsolute', handleOrientation);
            }
        };
    }, []);

    const handleStartCompass = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    setError('Permission denied');
                }
            } catch (err) {
                setError('Error requesting permission');
                console.error(err);
            }
        } else {
            // Non-iOS or older devices usually don't need explicit permission
            setPermissionGranted(true);
            // Android absolute support
            if ('ondeviceorientationabsolute' in window) {
                window.addEventListener('deviceorientationabsolute', handleOrientation);
            }
            // Standard support
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    const handleOrientation = (e) => {
        // Update raw sensor data for debugging
        setSensorData({
            alpha: e.alpha ? e.alpha.toFixed(2) : 'null',
            beta: e.beta ? e.beta.toFixed(2) : 'null',
            gamma: e.gamma ? e.gamma.toFixed(2) : 'null'
        });

        let compass = null;

        // iOS
        if (e.webkitCompassHeading) {
            compass = e.webkitCompassHeading;
        }
        // Android / Non-iOS
        else if (e.alpha !== null) {
            // Check if absolute is true or if we are in an absolute event
            if (e.absolute || e.type === 'deviceorientationabsolute') {
                compass = Math.abs(e.alpha - 360);
            } else {
                // Fallback for relative alpha, still better than nothing
                compass = Math.abs(e.alpha - 360);
            }
        }

        // Ensure compass is a valid number
        if (compass !== null && compass !== undefined) {
            setHeading(compass);
        }
    };

    const getCardinalDirection = (angle) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        return directions[index];
    };

    return (
        <div className="direction-analysis-page">
            <Navbar />

            <main className="da-container">
                <header className="da-header">
                    <h1>Live Compass & Direction Analysis</h1>
                    <p>Understanding the energy flow of your space through traditional Vedic principles.</p>
                </header>

                <div className="da-main-content">
                    {/* Compass Section - Centered */}
                    <div className="da-center full-width">
                        <div className="compass-container">
                            <div className="compass-visual-wrapper">
                                <div className="compass-arrow-marker"></div>
                                <img
                                    src={compassImg}
                                    alt="Live Compass"
                                    className="compass-img"
                                    style={{ transform: `rotate(${-heading}deg)` }}
                                    loading="eager"
                                    fetchPriority="high"
                                />
                                <div className="compass-white-circle"></div>
                                <div className="compass-center-dot"></div>
                            </div>

                            <div className="compass-status">
                                <div className="current-direction">
                                    <span className="degree-value">{Math.round(heading)}°</span>
                                    <span className="direction-label">{getCardinalDirection(heading)}</span>
                                </div>

                                {!permissionGranted && (
                                    <div className="compass-controls">
                                        <button className="btn-start-compass" onClick={handleStartCompass}>
                                            Enable Live Compass (Mobile)
                                        </button>
                                        <p className="compass-note" style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
                                            {!window.isSecureContext && <span style={{ color: 'red', display: 'block', marginBottom: '5px' }}>⚠️ Connection Insecure (HTTP). Sensors may fail.</span>}
                                            Live compass requires a mobile device with sensors.
                                        </p>
                                    </div>
                                )}

                                {error && <p className="compass-error">{error}</p>}

                                <div className="manual-override" style={{ marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                    <p className="manual-label" style={{ fontWeight: '600', color: '#4a90e2' }}>Laptop/PC Mode (Manual Simulation):</p>
                                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px' }}>Drag slider to rotate if sensors are unavailable.</p>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={heading}
                                        onChange={(e) => setHeading(Number(e.target.value))}
                                        className="compass-slider"
                                        style={{ '--slider-val': `${(heading / 360) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DirectionAnalysis;
