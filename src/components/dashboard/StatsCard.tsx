
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, change, color }) => {
  return (
    <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-navy-800 text-sm font-medium">{title}</CardTitle>
          <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-navy-700 mb-1">{value}</div>
        <p className="text-slate-600 text-xs">{change}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
