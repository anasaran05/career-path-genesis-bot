import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Process from '@/components/landing/Process';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/intake');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        <Hero handleGetStarted={handleGetStarted} />
        <Process />
        <Features />
        <CTA handleGetStarted={handleGetStarted} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;