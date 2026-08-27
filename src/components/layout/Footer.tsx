import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background pt-24 pb-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading mb-6 tracking-tighter leading-[0.95]">
              Let's build <br/>
              <span className="italic text-background/60 font-light">something real.</span>
            </h2>
            <p className="mb-8 max-w-sm font-sans font-light text-background/70 text-lg">
              Ready to scale your business with AI and world-class creative? Drop us a line.
            </p>
            <a href="mailto:hello@reelywood.com" className="inline-flex items-center gap-4 bg-background text-foreground font-sans font-medium px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all rounded-sm">
              hello@reelywood.com <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-background/40 mb-8">Navigation</h4>
            <ul className="space-y-4 font-sans font-light text-lg">
              <li><Link to="/" className="hover:text-background/60 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-background/60 transition-colors">Services</Link></li>
              <li><Link to="/work" className="hover:text-background/60 transition-colors">Work</Link></li>
              <li><Link to="/about" className="hover:text-background/60 transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-background/40 mb-8">Social</h4>
            <ul className="space-y-4 font-sans font-light text-lg">
              <li><a href="https://www.instagram.com/reelywood.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-background/60 transition-colors flex items-center gap-3"><FaInstagram size={20} /> Instagram</a></li>
              <li><a href="https://www.facebook.com/arfishdealers" target="_blank" rel="noopener noreferrer" className="hover:text-background/60 transition-colors flex items-center gap-3"><FaFacebookF size={20} /> Facebook</a></li>
              <li><a href="https://in.linkedin.com/company/reelywood" target="_blank" rel="noopener noreferrer" className="hover:text-background/60 transition-colors flex items-center gap-3"><FaLinkedinIn size={20} /> LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/10 font-mono text-xs uppercase text-background/40">
          <div>&copy; {new Date().getFullYear()} Reelywood. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Privacy</a>
            <a href="#" className="hover:text-background transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
