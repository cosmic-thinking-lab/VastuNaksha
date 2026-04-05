import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');
        console.log('Admin Key:', key);

        if (key && key.toUpperCase() === 'VASTU2468') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            setTimeout(() => {
                window.location.href = 'http://localhost:5173';
            }, 1000);
        }
    }, []);

    if (isAuthorized === null) return <div style={{ padding: '50px', textAlign: 'center' }}>Verifying...</div>;
    if (isAuthorized === false) return <div style={{ padding: '50px', textAlign: 'center' }}>Unauthorized. Redirecting...</div>;

    return children;
};

export default ProtectedRoute;
