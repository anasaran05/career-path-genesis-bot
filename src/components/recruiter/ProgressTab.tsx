
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressTab = () => {
  const progressData = [
    { label: "Applications Reviewed", value: 85, total: 100, color: "bg-blue-500" },
    { label: "Interviews Scheduled", value: 12, total: 20, color: "bg-green-500" },
    { label: "Offers Extended", value: 8, total: 12, color: "bg-purple-500" },
    { label: "Hiring Goal", value: 6, total: 10, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy-800">Progress Analytics</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {progressData.map((item, index) => (
          <Card key={item.label} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader>
              <CardTitle className="text-navy-800 text-lg">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-navy-700">{item.value}</span>
                <span className="text-slate-600">of {item.total}</span>
              </div>
              <Progress value={(item.value / item.total) * 100} className="h-3" />
              <p className="text-sm text-slate-600 mt-2">{Math.round((item.value / item.total) * 100)}% complete</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Animated Progress Ring */}
      <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-navy-800">Monthly Hiring Goal</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray="314"
                strokeDashoffset="125.6"
                className="animate-[spin_2s_ease-in-out_infinite]"
                style={{
                  animation: 'none',
                  strokeDashoffset: `${314 - (314 * 60) / 100}`,
                  transition: 'stroke-dashoffset 1s ease-in-out'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-navy-700">60%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTab;
