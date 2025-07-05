import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Target } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-navy-700 font-bold text-xl">Zane AI</span>
            <p className="text-slate-600 text-sm">by ZaneProEd</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#features" className="text-slate-600 hover:text-navy-600 transition-colors">Features</a>
          <a href="#process" className="text-slate-600 hover:text-navy-600 transition-colors">How it Works</a>
          <a href="#contact" className="text-slate-600 hover:text-navy-600 transition-colors">Contact</a>
          
          <div className="flex items-center space-x-3">
            <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl">
              <Target className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;