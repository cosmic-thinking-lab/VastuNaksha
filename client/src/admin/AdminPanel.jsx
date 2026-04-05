import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import Navbar from './components/Navbar';
import RequestButtons from './components/RequestButtons';
import VastuRequests from './components/VastuRequests';
import CallRequests from './components/CallRequests';

const AdminPanel = () => {
    const [activeView, setActiveView] = useState('vastu');
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');

        if (key && key.toUpperCase() === 'VASTU2468') {
            setAuthorized(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
    if (!authorized) return <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>Unauthorized - Invalid Key</div>;

    return (
        <div className="admin-panel">
            <Navbar />
            <RequestButtons activeView={activeView} setActiveView={setActiveView} />
            {activeView === 'vastu' ? <VastuRequests /> : <CallRequests />}
        </div>
    );
};

export default AdminPanel;
