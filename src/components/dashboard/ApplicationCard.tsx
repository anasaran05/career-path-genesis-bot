
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Star, Eye, CheckCircle, Calendar, X } from "lucide-react";

interface Application {
  id: number;
  candidateName: string;
  position: string;
  experience: string;
  status: string;
  appliedDate: string;
  degree: string;
  university: string;
  skills: string[];
  rating: number;
  location: string;
}

interface ApplicationCardProps {
  application: Application;
  onApplicationAction: (action: string, applicationId: number) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onApplicationAction }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'shortlisted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'interviewed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'applied': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:scale-[1.01]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-navy-800 text-lg">{application.candidateName}</CardTitle>
              <CardDescription className="text-slate-600">
                Applied for {application.position} • {application.experience} experience
              </CardDescription>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="text-slate-600">{application.degree} • {application.university}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-slate-600">{application.rating}</span>
                </div>
                <span className="text-slate-600">{application.location}</span>
              </div>
              <div className="flex space-x-2 mt-2">
                {application.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Badge 
            variant="outline"
            className={`capitalize ${getStatusColor(application.status)}`}
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
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl hover:scale-105 transition-all"
              onClick={() => onApplicationAction('view-resume', application.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Resume
            </Button>
            {application.status === 'applied' && (
              <Button 
                size="sm" 
                className="bg-green-600 text-white rounded-xl hover:scale-105 transition-all"
                onClick={() => onApplicationAction('shortlist', application.id)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Shortlist
              </Button>
            )}
            {application.status === 'shortlisted' && (
              <Button 
                size="sm" 
                className="bg-blue-600 text-white rounded-xl hover:scale-105 transition-all"
                onClick={() => onApplicationAction('schedule', application.id)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 border-red-200 rounded-xl hover:scale-105 transition-all"
              onClick={() => onApplicationAction('reject', application.id)}
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
