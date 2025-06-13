
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, FileText, Users, Plus } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'progress', label: 'Progress Analytics', icon: Target },
    { id: 'jobs', label: 'Job Postings', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'post-job', label: 'Post New Job', icon: Plus }
  ];

  return (
    <div className="flex space-x-4 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'outline'}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center space-x-2 rounded-xl transition-all duration-300 hover:scale-105 ${
            activeTab === tab.id 
              ? 'bg-gradient-to-r from-navy-600 to-autumn-500 text-white shadow-lg' 
              : 'border-2 border-slate-200 text-navy-700 hover:bg-navy-50'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;
