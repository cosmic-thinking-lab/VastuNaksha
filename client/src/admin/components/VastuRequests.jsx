import React, { useState, useEffect } from 'react';
import './VastuRequests.css';

const VastuRequests = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('https://vastunaksha.onrender.com/api/contact/all');
            const data = await response.json();
            if (data.success) {
                setBookings(data.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`https://vastunaksha.onrender.com/api/contact/status/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.success) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="requests-container">
            <h2>Vastu Requests ({bookings.length})</h2>
            <table className="requests-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Plan File</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.description || '-'}</td>
                            <td><a href={booking.planFileUrl} target="_blank" rel="noopener noreferrer">View File</a></td>
                            <td>{new Date(booking.createdAt).toLocaleString()}</td>
                            <td>
                                <select
                                    value={booking.status}
                                    onChange={(e) => updateStatus(booking._id, e.target.value)}
                                    className="status-select"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="on-process">On-Process</option>
                                    <option value="done">Done</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VastuRequests;
