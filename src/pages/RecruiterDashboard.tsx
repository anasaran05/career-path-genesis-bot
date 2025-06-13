
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Users, FileText, TrendingUp, Plus, Search, User, Eye, CheckCircle, X, Calendar, Target, Award, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const RecruiterDashboard = () => {
  const { userProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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

  const progressData = [
    { label: "Applications Reviewed", value: 85, total: 100, color: "bg-blue-500" },
    { label: "Interviews Scheduled", value: 12, total: 20, color: "bg-green-500" },
    { label: "Offers Extended", value: 8, total: 12, color: "bg-purple-500" },
    { label: "Hiring Goal", value: 6, total: 10, color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-600 text-sm">Talent Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-navy-700 font-medium">
              {userProfile?.recruiter_profiles?.[0]?.company_name || 'Company'}
            </span>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl p-8 text-white animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to the ZaneProEd Talent Portal
            </h1>
            <p className="text-xl opacity-90">Hire Smart, Hire Right.</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'progress', label: 'Progress Analytics', icon: Target },
            { id: 'jobs', label: 'Job Postings', icon: FileText },
            { id: 'applications', label: 'Applications', icon: Users },
            { id: 'post-job', label: 'Post New Job', icon: Plus }
          ].map((tab) => (
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

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
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
        )}

        {activeTab === 'progress' && (
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
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy-800">Your Job Postings</h2>
              <Button 
                onClick={() => setActiveTab('post-job')}
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
        )}

        {activeTab === 'applications' && (
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
        )}

        {activeTab === 'post-job' && (
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in">
              <CardHeader>
                <CardTitle className="text-navy-800 text-2xl">Post a New Job</CardTitle>
                <CardDescription>Fill in the details to post your job opening</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Job Title</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Location</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., Mumbai, Maharashtra" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-navy-700 font-medium">Job Description</label>
                  <Textarea 
                    className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" 
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Experience Level</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., 2-4 years" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-navy-700 font-medium">Salary Range</label>
                    <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., ₹6-10 LPA" />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  Post Job Opening
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
