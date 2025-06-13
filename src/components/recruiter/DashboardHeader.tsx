
import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHeader = () => {
  const { userProfile, signOut } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-navy-700 font-bold text-xl">Zane AI</span>
            <p className="text-slate-600 text-sm">Talent Portal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-navy-700 font-medium">
            {userProfile?.recruiter_profiles?.[0]?.company_name || 'Company'}
          </span>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
