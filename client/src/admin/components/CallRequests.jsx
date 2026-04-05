import React, { useState, useEffect } from 'react';
import './CallRequests.css';

const CallRequests = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('https://vastunaksha.onrender.com/api/booking/all');
            const data = await response.json();
            if (data.success) {
                setContacts(data.data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`https://vastunaksha.onrender.com/api/booking/status/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.success) {
                setContacts(contacts.map(c => c._id === id ? { ...c, status } : c));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="requests-container">
            <h2>Call Requests ({contacts.length})</h2>
            <table className="requests-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Selected Date</th>
                        <th>Time</th>
                        <th>Submitted Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact._id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.selectedDate || '-'}</td>
                            <td>{contact.selectedTime}</td>
                            <td>{new Date(contact.createdAt).toLocaleString()}</td>
                            <td>
                                <select
                                    value={contact.status}
                                    onChange={(e) => updateStatus(contact._id, e.target.value)}
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

export default CallRequests;
