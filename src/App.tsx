import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Industries from './pages/Industries';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import Work from './pages/Work';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/industries/*" element={<Industries />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>
    </Router>
  );
}
