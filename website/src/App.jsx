import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';

// Modules
import Home from './modules/home';
import About from './modules/about';
import Portfolio from './modules/portfolio';
import Services from './modules/services';
import Career from './modules/career';
import Contact from './modules/contact';
import LegalPage from './modules/legal/LegalPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="/cookies" element={<LegalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
