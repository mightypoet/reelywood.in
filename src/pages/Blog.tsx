import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Blog() {
  return (
    <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col justify-between">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p>Blog coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}
