
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Eye, CheckCircle, X } from "lucide-react";

const ApplicationsTab = () => {
  const mockApplications = [
    {
      id: 1,
      candidateName: "Priya Sharma",
      position: "Software Engineer",
      experience: "2 years",
      status: "applied",
      appliedDate: "2024-01-15",
      score: 85
    },
    {
      id: 2,
      candidateName: "Rahul Patel",
      position: "Software Engineer",
      experience: "3 years",
      status: "shortlisted",
      appliedDate: "2024-01-14",
      score: 92
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy-800">Recent Applications</h2>
      
      <div className="grid gap-4">
        {mockApplications.map((application, index) => (
          <Card key={application.id} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center animate-pulse">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-navy-800">{application.candidateName}</CardTitle>
                    <CardDescription className="text-slate-600">
                      Applied for {application.position} • {application.experience} experience
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-slate-600">AI Score:</span>
                      <span className="text-sm font-semibold text-green-600">{application.score}%</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={application.status === 'shortlisted' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">
                  Applied on {application.appliedDate}
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" className="rounded-xl hover:scale-105 transition-all duration-300">
                    <Eye className="w-4 h-4 mr-2" />
                    View Resume
                  </Button>
                  <Button size="sm" className="bg-green-600 text-white rounded-xl hover:scale-105 transition-all duration-300">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Shortlist
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 rounded-xl hover:scale-105 transition-all duration-300">
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsTab;
