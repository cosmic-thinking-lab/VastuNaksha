import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Inspiration from '../components/Inspiration';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Inspiration />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
