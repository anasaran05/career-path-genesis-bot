
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Eye } from "lucide-react";

interface JobsTabProps {
  onPostJobClick: () => void;
}

const JobsTab: React.FC<JobsTabProps> = ({ onPostJobClick }) => {
  const mockJobs = [
    {
      id: 1,
      title: "Software Engineer",
      applications: 24,
      status: "active",
      location: "Mumbai",
      type: "Full-time",
      progress: 75
    },
    {
      id: 2,
      title: "Data Scientist",
      applications: 18,
      status: "active",
      location: "Delhi",
      type: "Full-time",
      progress: 60
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-navy-800">Your Job Postings</h2>
        <Button 
          onClick={onPostJobClick}
          className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="grid gap-4">
        {mockJobs.map((job, index) => (
          <Card key={job.id} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-navy-800">{job.title}</CardTitle>
                  <CardDescription className="text-slate-600">
                    {job.location} • {job.type}
                  </CardDescription>
                </div>
                <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-navy-700 font-medium">
                    {job.applications} applications
                  </span>
                  <span className="text-sm text-slate-600">{job.progress}% filled</span>
                </div>
                <Progress value={job.progress} className="h-2" />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" className="rounded-xl hover:scale-105 transition-all duration-300">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" className="bg-navy-600 text-white rounded-xl hover:scale-105 transition-all duration-300">
                    Manage
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

export default JobsTab;
