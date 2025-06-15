
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface ActivityItem {
  action: string;
  candidate: string | null;
  position: string;
  time: string;
  type: 'application' | 'interview' | 'job';
}

const ActivityFeed: React.FC = () => {
  const activities: ActivityItem[] = [
    { action: "New application received", candidate: "Dr. Priya Sharma", position: "Clinical Research Associate", time: "2 hours ago", type: "application" },
    { action: "Interview completed", candidate: "Dr. Anjali Verma", position: "Sales Manager", time: "4 hours ago", type: "interview" },
    { action: "Job posting activated", candidate: null, position: "Pharmacovigilance Specialist", time: "1 day ago", type: "job" }
  ];

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'application': return 'bg-green-500';
      case 'interview': return 'bg-blue-500';
      case 'job': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-navy-800 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`w-3 h-3 rounded-full ${getActivityColor(activity.type)}`} />
              <div className="flex-1">
                <p className="text-navy-700 font-medium">{activity.action}</p>
                <p className="text-slate-600 text-sm">
                  {activity.candidate ? `${activity.candidate} - ${activity.position}` : activity.position}
                </p>
              </div>
              <span className="text-slate-500 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
