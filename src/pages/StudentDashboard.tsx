
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, User, BookOpen, Target, TrendingUp, Calendar, Award, FileText, Briefcase, Star, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { userProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const profileCompletionData = [
    { label: "Basic Info", completed: true, score: 100 },
    { label: "Skills Assessment", completed: true, score: 85 },
    { label: "Career Interests", completed: false, score: 0 },
    { label: "Portfolio", completed: false, score: 0 }
  ];

  const mockApplications = [
    {
      id: 1,
      company: "Tech Corp",
      position: "Software Developer",
      status: "applied",
      appliedDate: "2024-01-15",
      progress: 25
    },
    {
      id: 2,
      company: "Data Solutions",
      position: "Data Analyst",
      status: "interview",
      appliedDate: "2024-01-10",
      progress: 75
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Career Fair - Tech Companies",
      date: "Jan 25, 2024",
      time: "10:00 AM",
      type: "event"
    },
    {
      id: 2,
      title: "Interview - Data Solutions",
      date: "Jan 20, 2024",
      time: "2:00 PM",
      type: "interview"
    }
  ];

  const overallCompletion = Math.round((profileCompletionData.reduce((acc, item) => acc + item.score, 0) / (profileCompletionData.length * 100)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-600 text-sm">Student Portal</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-navy-700 font-medium">
              {userProfile?.full_name || 'Student'}
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
              Welcome to Your Career Journey
            </h1>
            <p className="text-xl opacity-90">Shape Your Future with AI-Powered Insights</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 flex-wrap">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'profile', label: 'Profile Progress', icon: User },
            { id: 'applications', label: 'Applications', icon: FileText },
            { id: 'career-tools', label: 'Career Tools', icon: Target },
            { id: 'events', label: 'Events', icon: Calendar }
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
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-navy-700">5</div>
                        <p className="text-slate-600 text-sm">Applications</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-navy-700">2</div>
                        <p className="text-slate-600 text-sm">Interviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-navy-700">{overallCompletion}%</div>
                        <p className="text-slate-600 text-sm">Profile Complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Applications */}
              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplications.map((app, index) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-navy-800">{app.position}</div>
                            <div className="text-sm text-slate-600">{app.company}</div>
                          </div>
                        </div>
                        <Badge variant={app.status === 'interview' ? 'default' : 'secondary'}>
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="relative w-24 h-24 mx-auto">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#e2e8f0"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="283"
                          strokeDashoffset={`${283 - (283 * overallCompletion) / 100}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-navy-700">{overallCompletion}%</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={event.id} className="p-3 bg-slate-50 rounded-lg animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="font-medium text-navy-800 text-sm">{event.title}</div>
                        <div className="text-xs text-slate-600">{event.date} at {event.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Profile Progress</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {profileCompletionData.map((item, index) => (
                <Card key={item.label} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-navy-800 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={item.score} className="h-3 mb-3" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{item.score}% complete</span>
                      {!item.completed && (
                        <Button size="sm" variant="outline" className="rounded-xl">
                          Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">My Applications</h2>
            
            <div className="grid gap-4">
              {mockApplications.map((app, index) => (
                <Card key={app.id} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-navy-800">{app.position}</CardTitle>
                        <CardDescription className="text-slate-600">{app.company}</CardDescription>
                      </div>
                      <Badge variant={app.status === 'interview' ? 'default' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Progress</span>
                        <span className="text-sm font-semibold">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                      <div className="text-sm text-slate-600">
                        Applied on {app.appliedDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'career-tools' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Career Tools & Resources</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/intake">
                <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-navy-800 mb-2">Career Analysis</h3>
                      <p className="text-sm text-slate-600">Get AI-powered career recommendations</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/job-scan">
                <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-navy-800 mb-2">Job Market Scan</h3>
                      <p className="text-sm text-slate-600">Explore opportunities in your field</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-navy-800 mb-2">Skills Assessment</h3>
                    <p className="text-sm text-slate-600">Evaluate and improve your skills</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Upcoming Events</h2>
            
            <div className="grid gap-4">
              {upcomingEvents.map((event, index) => (
                <Card key={event.id} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-800">{event.title}</h3>
                          <p className="text-sm text-slate-600">{event.date} at {event.time}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
