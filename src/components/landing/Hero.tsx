import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Target, ArrowDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface HeroProps {
    handleGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ handleGetStarted }) => {
    return (
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-autumn-100 text-autumn-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-navy-800 mb-6 leading-tight animate-fade-in">
              Meet
              <span className="bg-gradient-to-r from-navy-600 to-autumn-500 bg-clip-text text-transparent"> Zane AI</span>
            </h1>
            
            <p className="text-xl text-navy-600 font-medium mb-4 animate-fade-in">Smart Career Mapping for all</p>
            
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">Your intelligent career co-pilot that analyzes your background, maps perfect career paths, and guides you to success.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
              <Button onClick={handleGetStarted} size="lg" className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Your Career Journey
                <Target className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-navy-200 text-navy-700 hover:bg-navy-50 px-8 py-4 text-lg rounded-xl transition-all duration-300">
                Watch Demo
              </Button>
            </div>

            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-slate-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
};

export default Hero;