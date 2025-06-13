
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, GraduationCap, Users, TrendingUp, BookOpen, Award, FileText, BarChart3, Calendar, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const UniversityPortal = () => {
  const { userProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const studentStats = [
    { label: "Total Students", value: 15420, change: "+12%", icon: Users, color: "bg-blue-500" },
    { label: "Active Placements", value: 847, change: "+8%", icon: TrendingUp, color: "bg-green-500" },
    { label: "Career Assessments", value: 2156, change: "+15%", icon: FileText, color: "bg-purple-500" },
    { label: "Placement Rate", value: "92%", change: "+3%", icon: Award, color: "bg-orange-500" }
  ];

  const departmentData = [
    { name: "Computer Science", students: 3200, placements: 2880, rate: 90 },
    { name: "Engineering", students: 2800, placements: 2520, rate: 90 },
    { name: "Business", students: 2500, placements: 2250, rate: 90 },
    { name: "Arts & Sciences", students: 1900, placements: 1615, rate: 85 },
    { name: "Medicine", students: 1200, placements: 1140, rate: 95 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "placement",
      message: "25 students from CS department got placed at Tech Corp",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "assessment",
      message: "Career assessment campaign launched for final year students",
      time: "4 hours ago"
    },
    {
      id: 3,
      type: "event",
      message: "Virtual career fair scheduled for next week",
      time: "1 day ago"
    }
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
              <p className="text-slate-600 text-sm">University Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-navy-600" />
              <span className="text-navy-700 font-medium">University Dashboard</span>
            </div>
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
              University Career Services Dashboard
            </h1>
            <p className="text-xl opacity-90">Empowering Student Success Through AI-Driven Career Guidance</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 flex-wrap">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'departments', label: 'Departments', icon: Building },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'students', label: 'Student Management', icon: Users },
            { id: 'campaigns', label: 'Campaigns', icon: Calendar }
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
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              {studentStats.map((stat, index) => (
                <Card key={stat.label} className="bg-white border border-slate-200 shadow-lg rounded-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-navy-700">{stat.value}</span>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center animate-pulse`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Department Performance */}
              <div className="lg:col-span-2">
                <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-navy-800">Department Performance</CardTitle>
                    <CardDescription>Placement rates by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentData.map((dept, index) => (
                        <div key={dept.name} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-navy-800">{dept.name}</span>
                            <span className="text-sm text-slate-600">{dept.placements}/{dept.students} ({dept.rate}%)</span>
                          </div>
                          <Progress value={dept.rate} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={activity.id} className="p-3 bg-slate-50 rounded-lg animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <p className="text-sm text-navy-800 font-medium">{activity.message}</p>
                        <p className="text-xs text-slate-600 mt-1">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Department Management</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentData.map((dept, index) => (
                <Card key={dept.name} className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader>
                    <CardTitle className="text-navy-800">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Students</span>
                        <span className="font-semibold">{dept.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Placed</span>
                        <span className="font-semibold text-green-600">{dept.placements}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Placement Rate</span>
                          <span className="font-semibold">{dept.rate}%</span>
                        </div>
                        <Progress value={dept.rate} className="h-2" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Analytics & Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Career Assessment Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
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
                          strokeDashoffset="62.8"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-navy-700">80%</span>
                      </div>
                    </div>
                    <p className="text-slate-600">Students completed career assessment</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">Industry Placement Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { industry: "Technology", percentage: 35, color: "bg-blue-500" },
                      { industry: "Finance", percentage: 25, color: "bg-green-500" },
                      { industry: "Healthcare", percentage: 20, color: "bg-purple-500" },
                      { industry: "Consulting", percentage: 15, color: "bg-orange-500" },
                      { industry: "Other", percentage: 5, color: "bg-gray-500" }
                    ].map((item, index) => (
                      <div key={item.industry} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-navy-800">{item.industry}</span>
                          <span className="text-sm text-slate-600">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy-800">Student Management</h2>
              <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl">
                Launch Career Campaign
              </Button>
            </div>
            
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-navy-800">Search Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input placeholder="Search by name, department, or ID..." className="flex-1" />
                  <Button variant="outline">Search</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {[1, 2, 3].map((student, index) => (
                <Card key={student} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-800">Student {student}</h3>
                          <p className="text-sm text-slate-600">Computer Science • Final Year</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-slate-600">Career Assessment:</span>
                            <Badge variant="outline" className="text-green-600">Completed</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-navy-800">Career Campaigns</h2>
              <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl">
                Create Campaign
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Final Year Career Assessment",
                  description: "Comprehensive career guidance for graduating students",
                  status: "Active",
                  participants: 1250,
                  completion: 78
                },
                {
                  title: "Industry Readiness Program",
                  description: "Skills assessment and development program",
                  status: "Planning",
                  participants: 800,
                  completion: 0
                }
              ].map((campaign, index) => (
                <Card key={campaign.title} className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-navy-800">{campaign.title}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                      </div>
                      <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Participants</span>
                        <span className="font-semibold">{campaign.participants}</span>
                      </div>
                      {campaign.status === 'Active' && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Completion</span>
                            <span className="font-semibold">{campaign.completion}%</span>
                          </div>
                          <Progress value={campaign.completion} className="h-2" />
                        </div>
                      )}
                      <Button className="w-full bg-navy-600 text-white rounded-xl">
                        Manage Campaign
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

export default UniversityPortal;
