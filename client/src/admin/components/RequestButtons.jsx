import React from 'react';
import './RequestButtons.css';

const RequestButtons = ({ activeView, setActiveView }) => {
    return (
        <div className="request-buttons-container">
            <button 
                className={`request-btn vastu-btn ${activeView === 'vastu' ? 'active' : ''}`}
                onClick={() => setActiveView('vastu')}
            >
                Vastu Requests
            </button>
            <button 
                className={`request-btn call-btn ${activeView === 'call' ? 'active' : ''}`}
                onClick={() => setActiveView('call')}
            >
                Call Requests
            </button>
        </div>
    );
};

export default RequestButtons;
