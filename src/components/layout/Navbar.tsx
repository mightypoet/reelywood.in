import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-2xl font-heading text-foreground tracking-tight">
          Reelywood<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-sm font-sans font-medium text-foreground/80">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="bg-foreground text-background px-6 py-2.5 hover:bg-primary hover:text-foreground transition-colors font-sans font-medium text-sm rounded-sm">
            Book a Call
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4 text-base font-sans font-medium text-foreground">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  to={link.path} 
                  className="hover:text-primary transition-colors block"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/contact" 
            className="bg-foreground text-background px-6 py-3 text-center font-sans font-medium hover:bg-primary transition-colors rounded-sm"
            onClick={() => setIsMobileOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
