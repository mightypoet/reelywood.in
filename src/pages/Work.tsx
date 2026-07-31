import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Portfolio from '../components/sections/Portfolio';

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-32 flex-grow">
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
}
