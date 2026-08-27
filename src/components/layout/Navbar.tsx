import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(true);
  const { mode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      setShowToggle(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowToggle(false);
      }, 2500);
    };

    handleActivity();

    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  const navLinks = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' }
  ];

  const isTech = mode === 'tech';

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[60] bg-foreground/5 backdrop-blur-sm border-b border-border py-2 flex justify-center items-center transition-all duration-500 ${showToggle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <button
          onClick={toggleTheme}
          className={`relative flex items-center p-1 rounded-full border transition-colors ${
            isTech ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#5e389e] border-[#452179] shadow-inner'
          }`}
          style={{ width: '280px', height: '44px' }}
        >
          <div className="flex-1 flex justify-center items-center z-10 text-xs font-bold gap-2">
            <Palette size={14} className={!isTech ? 'text-[#FFCC00]' : 'text-gray-500'} />
            <span className={!isTech ? 'text-white' : 'text-gray-500'}>Studio</span>
          </div>
          <div className="flex-1 flex justify-center items-center z-10 text-xs font-bold gap-2">
            <Code size={14} className={isTech ? 'text-blue-600' : 'text-white/50'} />
            <span className={isTech ? 'text-blue-600' : 'text-white/50'}>Tech</span>
          </div>
          <motion.div
            className={`absolute top-1 bottom-1 w-[136px] rounded-full shadow-sm z-0 ${
              isTech ? 'bg-gray-100 border border-gray-200' : 'bg-[#452179] border border-[#3b1c6e]'
            }`}
            animate={{ left: isTech ? '138px' : '4px' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        </button>
      </div>
      <header className={`fixed top-[60px] left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? (isTech ? 'bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm' : 'bg-[#3b1c6e]/95 backdrop-blur-md border-b border-[#33155e] py-4 shadow-lg') 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className={`text-3xl font-heading tracking-tight flex items-center gap-2 ${isTech ? 'text-foreground font-extrabold' : 'text-white'}`}>
            {isTech ? (
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
            ) : (
              <div className="w-10 h-10 bg-[#FFCC00] rounded-xl flex items-center justify-center shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full"></div></div>
                  <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full"></div></div>
                </div>
              </div>
            )}
            reelywood
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className={`flex items-center gap-8 text-base font-sans font-medium ${isTech ? 'text-foreground/70' : 'text-white/90'}`}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={`transition-colors ${isTech ? 'hover:text-primary' : 'hover:text-[#FFCC00]'}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              to="/contact" 
              className={isTech 
                ? "bg-foreground text-background px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors flex items-center gap-2" 
                : "clay-btn px-6 py-2.5 flex items-center gap-2 text-black"
              }
            >
              Let's Talk <ArrowUpRight size={18} />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden ${isTech ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 p-6 flex flex-col gap-6 shadow-xl ${
            isTech ? 'bg-background border-b border-border' : 'bg-[#452179] border-b border-[#33155e]'
          }`}>
            <ul className={`flex flex-col gap-4 text-lg font-sans font-medium ${isTech ? 'text-foreground' : 'text-white'}`}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className={`transition-colors block ${isTech ? 'hover:text-primary' : 'hover:text-[#FFCC00]'}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              to="/contact" 
              className={isTech
                ? "bg-foreground text-background px-6 py-3 rounded-lg text-center font-semibold hover:bg-primary transition-colors flex justify-center items-center gap-2"
                : "clay-btn flex justify-center items-center gap-2 text-black py-3"
              }
              onClick={() => setIsMobileOpen(false)}
            >
              Let's Talk <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
