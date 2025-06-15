
import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, userProfile, signOut } = useAuth();

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
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-navy-700 font-medium">
                Welcome, {userProfile?.full_name || 'User'}
              </span>
              <Link to={
                userProfile?.user_type === 'recruiter'
                  ? '/recruiter-dashboard'
                  : '/student-dashboard'
              }>
                <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={signOut} className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="outline" className="border-2 border-navy-200 text-navy-700 hover:bg-navy-50 rounded-xl">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
