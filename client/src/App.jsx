import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import DirectionAnalysis from './pages/DirectionAnalysis';
import Brochure from './pages/Brochure';
import Contact from './pages/Contact';
import AdminPanel from './admin/AdminPanel';
import './App.css';

const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-direction" element={<DirectionAnalysis />} />
        <Route path="/brochure" element={<Brochure />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
