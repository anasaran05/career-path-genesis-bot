
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, DollarSign, Users, Clock, Eye } from "lucide-react";

interface Job {
  id: number;
  title: string;
  applications: number;
  status: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedDate: string;
  urgency: string;
  company: string;
}

interface JobCardProps {
  job: Job;
  onJobAction: (action: string, jobId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onJobAction }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  return (
    <Card className={`bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:scale-[1.02] ${getUrgencyColor(job.urgency)}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-navy-800 text-xl mb-2">{job.title}</CardTitle>
            <div className="flex items-center space-x-4 text-slate-600 text-sm mb-3">
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getStatusColor(job.status)}>
                {job.status}
              </Badge>
              <Badge variant="outline" className="text-slate-600">
                {job.type}
              </Badge>
              <Badge variant="outline" className="text-slate-600">
                {job.experience}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-navy-700 font-medium flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{job.applications} applications</span>
            </span>
            <span className="text-slate-600 text-sm flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Posted {job.postedDate}</span>
            </span>
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl hover:scale-105 transition-all"
              onClick={() => onJobAction('view', job.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              size="sm" 
              className="bg-navy-600 text-white rounded-xl hover:scale-105 transition-all"
              onClick={() => onJobAction('edit', job.id)}
            >
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
