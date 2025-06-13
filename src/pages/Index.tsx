
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, TrendingUp, Users, ArrowRight, CheckCircle, Star, Zap, GraduationCap, Briefcase, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-500 text-xs">by ZaneProEd</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="outline" className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white rounded-xl shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Career Guidance for All Graduates
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-800 mb-6 leading-tight">
              Shape Your Future with
              <span className="bg-gradient-to-r from-navy-600 to-autumn-500 bg-clip-text text-transparent"> AI-Driven </span>
              Career Insights
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              From skill assessment to job market analysis, our intelligent platform provides personalized career recommendations for graduates across all fields and industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                  Start Your Career Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-navy-200 text-navy-700 hover:bg-navy-50 px-8 py-4 rounded-xl text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Options */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Choose Your Portal</h2>
          <p className="text-xl text-slate-600">Access specialized dashboards designed for your role</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link to="/student-dashboard">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Student Portal</h3>
                  <p className="text-slate-600 mb-4">Track your career progress, access assessments, and explore opportunities</p>
                  <Button className="w-full bg-blue-600 text-white rounded-xl">
                    Access Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/recruiter-dashboard">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Recruiter Portal</h3>
                  <p className="text-slate-600 mb-4">Manage job postings, review applications, and find top talent</p>
                  <Button className="w-full bg-green-600 text-white rounded-xl">
                    Access Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/university-portal">
            <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Building className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">University Portal</h3>
                  <p className="text-slate-600 mb-4">Monitor student progress, manage campaigns, and track placements</p>
                  <Button className="w-full bg-purple-600 text-white rounded-xl">
                    Access Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Comprehensive Career Solutions</h2>
          <p className="text-xl text-slate-600">Everything you need to make informed career decisions</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">AI Career Analysis</h3>
              <p className="text-slate-600 text-sm">Get personalized career recommendations based on your skills, interests, and market trends</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Job Market Insights</h3>
              <p className="text-slate-600 text-sm">Real-time analysis of job opportunities across all industries and sectors</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Skills Assessment</h3>
              <p className="text-slate-600 text-sm">Comprehensive evaluation of your abilities and identification of improvement areas</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Advisory Reports</h3>
              <p className="text-slate-600 text-sm">Detailed career guidance reports with actionable recommendations and next steps</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">How It Works</h2>
          <p className="text-xl text-slate-600">Simple steps to unlock your career potential</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">Complete Assessment</h3>
            <p className="text-slate-600">Answer questions about your skills, interests, and career goals</p>
          </div>
          
          <div className="text-center animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">AI Analysis</h3>
            <p className="text-slate-600">Our AI analyzes your profile against market data and trends</p>
          </div>
          
          <div className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">Get Recommendations</h3>
            <p className="text-slate-600">Receive personalized career paths and actionable insights</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-navy-600 to-autumn-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands of graduates who have found their perfect career path with Zane AI</p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-navy-700 hover:bg-slate-100 px-8 py-4 rounded-xl shadow-lg text-lg">
              Start Your Journey Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-navy-700 font-bold">Zane AI</span>
                <p className="text-slate-500 text-xs">by ZaneProEd</p>
              </div>
            </div>
            <div className="text-slate-600 text-sm">
              © 2024 ZaneProEd. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
