import React, { useState, useRef } from 'react';
import './ContactSection.css';
import BookingModal from './BookingModal';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            setFile(null);
            setFileName('No file chosen');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please upload a plan file.');
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('description', formData.description);
        data.append('planFile', file);

        try {
            const response = await fetch('https://vastunaksha.onrender.com/api/contact/submit', {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (result.success) {
                alert('Request submitted successfully!');
                setFormData({ name: '', email: '', description: '' });
                setFile(null);
                setFileName('No file chosen');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                alert(result.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit request. Please try again.');
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <h2 className="section-title-left">Contact & Start</h2>
                <div className="contact-grid">
                    <div className="contact-form-wrapper animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description*</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Describe your requirements"
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Plan</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        accept="image/*,.pdf"
                                    />
                                    <button
                                        type="button"
                                        className="btn-upload"
                                        onClick={handleFileButtonClick}
                                    >
                                        Choose File
                                    </button>
                                    <span className="file-name">{fileName}</span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">Submit Request</button>
                        </form>
                    </div>

                    <div className="contact-info-wrapper animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                        <div className="consultation-card">
                            <h3>Need help deciding?</h3>
                            <p>Book a 20-minute consultation to discuss your property, scope and deliverables.</p>
                            <button
                                type="button"
                                className="btn btn-dark book-btn"
                                onClick={() => setIsBookingModalOpen(true)}
                            >
                                Book Call
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        </section>
    );
};

export default ContactSection;
