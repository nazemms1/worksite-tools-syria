import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import WhyUsSection from './components/WhyUsSection';
import ExhibitionsSection from './components/ExhibitionsSection';
import LocationsSection from './components/LocationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ background: '#111111', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <WhyUsSection />
      <ExhibitionsSection />
      <LocationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
