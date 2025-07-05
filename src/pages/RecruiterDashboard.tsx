import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, FileText, TrendingUp, Plus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ResumeViewer from "@/components/ResumeViewer";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import JobCard from "@/components/dashboard/JobCard";
import ApplicationCard from "@/components/dashboard/ApplicationCard";

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);

  const mockJobs = [
    {
      id: 1,
      title: "Senior Clinical Research Associate",
      applications: 42,
      status: "active",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "3-5 years",
      postedDate: "2024-01-10",
      urgency: "high",
      company: "Pfizer India Ltd"
    },
    {
      id: 2,
      title: "Pharmaceutical Sales Manager",
      applications: 28,
      status: "active",
      location: "Delhi NCR",
      type: "Full-time",
      salary: "₹10-15 LPA",
      experience: "4-7 years",
      postedDate: "2024-01-08",
      urgency: "medium",
      company: "Sun Pharma Industries"
    },
    {
      id: 3,
      title: "Pharmacovigilance Specialist",
      applications: 18,
      status: "draft",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      salary: "₹6-9 LPA",
      experience: "2-4 years",
      postedDate: "2024-01-12",
      urgency: "low",
      company: "Dr. Reddy's Laboratories"
    },
    {
      id: 4,
      title: "Regulatory Affairs Manager",
      applications: 35,
      status: "paused",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "5-8 years",
      postedDate: "2024-01-05",
      urgency: "high",
      company: "Cipla Limited"
    }
  ];

  const mockApplications = [
    {
      id: 1,
      candidateName: "Dr. Priya Sharma",
      position: "Senior Clinical Research Associate",
      experience: "4 years",
      status: "shortlisted",
      appliedDate: "2024-01-15",
      degree: "Pharm.D",
      university: "NIPER, Mohali",
      skills: ["GCP", "Protocol Development", "Data Analysis"],
      rating: 4.8,
      location: "Mumbai"
    },
    {
      id: 2,
      candidateName: "Rahul Patel",
      position: "Senior Clinical Research Associate",
      experience: "3.5 years",
      status: "applied",
      appliedDate: "2024-01-14",
      degree: "M.Pharm",
      university: "Jamia Hamdard",
      skills: ["Clinical Trials", "Regulatory Compliance", "CDISC"],
      rating: 4.5,
      location: "Delhi"
    },
    {
      id: 3,
      candidateName: "Dr. Anjali Verma",
      position: "Pharmaceutical Sales Manager",
      experience: "6 years",
      status: "interviewed",
      appliedDate: "2024-01-13",
      degree: "B.Pharm + MBA",
      university: "BITS Pilani",
      skills: ["Sales Strategy", "Key Account Management", "Market Analysis"],
      rating: 4.9,
      location: "Gurgaon"
    },
    {
      id: 4,
      candidateName: "Vikash Kumar",
      position: "Pharmacovigilance Specialist",
      experience: "2.5 years",
      status: "rejected",
      appliedDate: "2024-01-12",
      degree: "M.Pharm",
      university: "JSS University",
      skills: ["ADR Reporting", "Signal Detection", "MedDRA"],
      rating: 4.2,
      location: "Bangalore"
    }
  ];

  const handleJobAction = (action, jobId) => {
    switch(action) {
      case 'view':
        const job = mockJobs.find(j => j.id === jobId);
        setSelectedJob(job);
        toast({
          title: "Job Details",
          description: `Viewing details for ${job?.title}`,
        });
        break;
      case 'edit':
        toast({
          title: "Edit Job",
          description: "Redirecting to job editor...",
        });
        break;
      case 'pause':
        toast({
          title: "Job Paused",
          description: "Job posting has been paused successfully",
        });
        break;
      case 'activate':
        toast({
          title: "Job Activated",
          description: "Job posting is now active",
        });
        break;
    }
  };

  const handleApplicationAction = (action, applicationId) => {
    const application = mockApplications.find(a => a.id === applicationId);
    switch(action) {
      case 'shortlist':
        toast({
          title: "Candidate Shortlisted",
          description: `${application?.candidateName} has been shortlisted`,
        });
        break;
      case 'reject':
        toast({
          title: "Candidate Rejected",
          description: `${application?.candidateName} has been rejected`,
        });
        break;
      case 'schedule':
        toast({
          title: "Interview Scheduled",
          description: `Interview scheduled with ${application?.candidateName}`,
        });
        break;
      case 'view-resume':
        setSelectedResumeId(applicationId);
        setIsResumeViewerOpen(true);
        toast({
          title: "Opening Resume",
          description: `Loading resume for ${application?.candidateName}`,
        });
        break;
    }
  };

  const handleCloseResumeViewer = () => {
    setIsResumeViewerOpen(false);
    setSelectedResumeId(null);
  };

  const statsData = [
    { title: "Active Jobs", value: "8", icon: FileText, change: "+2 this week", color: "from-blue-500 to-blue-600" },
    { title: "Total Applications", value: "247", icon: Users, change: "+45 this month", color: "from-green-500 to-green-600" },
    { title: "Interviews Scheduled", value: "15", icon: TrendingUp, change: "Next 7 days", color: "from-purple-500 to-purple-600" },
    { title: "Successful Hires", value: "12", icon: Brain, change: "This quarter", color: "from-orange-500 to-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-600 text-sm">Talent Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-navy-700 font-medium">
              Premium Healthcare Solutions
            </span>
            <Button 
              variant="outline" 
              className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl hover:scale-105 transition-all"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl p-8 text-white transform hover:scale-[1.02] transition-transform">
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">
              Welcome to the ZaneProEd Talent Portal
            </h1>
            <p className="text-xl opacity-90">Hire Smart, Hire Right. Connect with Healthcare's Brightest Minds.</p>
            <div className="mt-4 flex space-x-4 text-sm opacity-80">
              <span>📈 42% faster hiring</span>
              <span>🎯 Pre-screened candidates</span>
              <span>💰 Cost-effective recruitment</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp, count: null },
            { id: 'jobs', label: 'Job Postings', icon: FileText, count: mockJobs.filter(j => j.status === 'active').length },
            { id: 'applications', label: 'Applications', icon: Users, count: mockApplications.filter(a => a.status === 'applied').length },
            { id: 'post-job', label: 'Post New Job', icon: Plus, count: null }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 rounded-xl hover:scale-105 transition-all ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-navy-600 to-autumn-500 text-white shadow-lg' 
                  : 'border-2 border-slate-200 text-navy-700 hover:bg-navy-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count && (
                <Badge variant="secondary" className="ml-1 bg-white text-navy-700">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
            <ActivityFeed />
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy-800">Your Job Postings</h2>
              <Button 
                onClick={() => setActiveTab('post-job')}
                className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl hover:scale-105 transition-all shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="grid gap-6">
              {mockJobs.map((job) => (
                <JobCard key={job.id} job={job} onJobAction={handleJobAction} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy-800">Recent Applications</h2>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Search candidates..." 
                  className="w-64 rounded-xl"
                />
                <Button variant="outline" className="rounded-xl">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {mockApplications.map((application) => (
                <ApplicationCard 
                  key={application.id} 
                  application={application} 
                  onApplicationAction={handleApplicationAction} 
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'post-job' && (
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-navy-800 text-2xl">Post a New Job</CardTitle>
                <CardDescription>Fill in the details to post your job opening to ZaneProEd's healthcare talent network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Job Title *</label>
                    <Input 
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                      placeholder="e.g., Senior Clinical Research Associate" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Company</label>
                    <Input 
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                      placeholder="e.g., Pfizer India Ltd" 
                      defaultValue="Premium Healthcare Solutions"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Location *</label>
                    <Input 
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                      placeholder="e.g., Mumbai, Maharashtra" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Job Type</label>
                    <Input 
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                      placeholder="e.g., Full-time, Part-time, Contract" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-navy-700 font-medium">Job Description *</label>
                  <Textarea 
                    className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                    placeholder="Describe the role, responsibilities, and requirements. Include key qualifications and what makes this opportunity unique..."
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Experience Level</label>
                    <Input 
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                      placeholder="e.g., 2-4 years, Entry level, Senior" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Salary Range</label>
                    <Input 
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 transition-all" 
                      placeholder="e.g., ₹6-10 LPA, Competitive" 
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-navy-600 to-autumn-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
                    onClick={() => toast({
                      title: "Job Posted Successfully!",
                      description: "Your job posting is now live and visible to qualified candidates.",
                    })}
                  >
                    Post Job Opening
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-8 rounded-xl hover:scale-105 transition-all"
                    onClick={() => toast({
                      title: "Draft Saved",
                      description: "Your job posting has been saved as a draft.",
                    })}
                  >
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Resume Viewer Modal */}
      {selectedResumeId && (
        <ResumeViewer
          isOpen={isResumeViewerOpen}
          onClose={handleCloseResumeViewer}
          applicationId={selectedResumeId}
        />
      )}
    </div>
  );
};

export default RecruiterDashboard;