import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        selectedDate: '',
        selectedTime: ''
    });

    // Mock available time slots
    const availableTimeSlots = [
        '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTimeSelect = (time) => {
        setFormData(prev => ({
            ...prev,
            selectedTime: time
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://vastunaksha.onrender.com/api/booking/book-call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Booking request submitted successfully!');
                onClose();
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    selectedDate: '',
                    selectedTime: ''
                });
            } else {
                alert(result.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Failed to submit booking. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="booking-modal-overlay" onClick={onClose}>
            <div className="booking-modal-content" onClick={e => e.stopPropagation()}>
                <button className="booking-modal-close" onClick={onClose}>&times;</button>
                <h2 className="booking-modal-title">Book a Consultation</h2>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="booking-form-group">
                        <label>Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="booking-form-group">
                        <label>Email*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="booking-form-group">
                        <label>Phone Number*</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone number"
                        />
                    </div>


                    <div className="booking-form-group">
                        <label>Preferred Date*</label>
                        <input
                            type="date"
                            name="selectedDate"
                            value={formData.selectedDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            placeholder="Select a date"
                        />
                    </div>

                    <div className="booking-form-group">
                        <label>Select Preferred Time*</label>
                        <div className="time-slots-grid">
                            {availableTimeSlots.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    className={`time-slot-btn ${formData.selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <input
                            type="hidden"
                            required
                            value={formData.selectedTime}
                            onInvalid={(e) => e.target.setCustomValidity('Please select a time slot')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <button type="submit" className="booking-submit-btn">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
