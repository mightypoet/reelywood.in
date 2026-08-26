import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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
    { label: 'Products', path: '/products' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#3b1c6e]/95 backdrop-blur-md border-b border-[#33155e] py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-3xl font-heading text-white tracking-tight flex items-center gap-2">
          {/* Faux logo resembling the owl */}
          <div className="w-10 h-10 bg-[#FFCC00] rounded-xl flex items-center justify-center shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full"></div></div>
              <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full"></div></div>
            </div>
          </div>
          reelywood
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-base font-sans font-medium text-white/90">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-[#FFCC00] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="clay-btn flex items-center gap-2 text-black">
            Let's Talk <ArrowUpRight size={18} />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#452179] border-b border-[#33155e] p-6 flex flex-col gap-6 shadow-xl">
          <ul className="flex flex-col gap-4 text-lg font-sans font-medium text-white">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  to={link.path} 
                  className="hover:text-[#FFCC00] transition-colors block"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/contact" 
            className="clay-btn flex justify-center items-center gap-2 text-black"
            onClick={() => setIsMobileOpen(false)}
          >
            Let's Talk <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
