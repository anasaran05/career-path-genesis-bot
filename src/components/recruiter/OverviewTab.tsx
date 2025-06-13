
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, Award } from "lucide-react";

const OverviewTab = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-navy-800 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <span>Active Jobs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-navy-700 animate-scale-in">8</div>
          <p className="text-slate-600 text-sm">Currently hiring</p>
        </CardContent>
      </Card>

      <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
        <CardHeader className="pb-3">
          <CardTitle className="text-navy-800 flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-500" />
            <span>Total Applications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-navy-700 animate-scale-in">247</div>
          <p className="text-slate-600 text-sm">This month</p>
        </CardContent>
      </Card>

      <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader className="pb-3">
          <CardTitle className="text-navy-800 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span>Interviews Scheduled</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-navy-700 animate-scale-in">15</div>
          <p className="text-slate-600 text-sm">Next 7 days</p>
        </CardContent>
      </Card>

      <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
        <CardHeader className="pb-3">
          <CardTitle className="text-navy-800 flex items-center space-x-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span>Hired</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-navy-700 animate-scale-in">12</div>
          <p className="text-slate-600 text-sm">This quarter</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
