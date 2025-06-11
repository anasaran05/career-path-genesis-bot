import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, User, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-bold text-xl">ZaneProEd Career Agent</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#process" className="text-white/80 hover:text-white transition-colors">Process</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your AI-Powered
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> ZaneProEd Career Agent</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            From student background analysis to automated job applications. 
            Let AI build your career path, create perfect resumes, and apply to hundreds of jobs while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/intake">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold">
                Start Your Career Journey
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Watch Demo
            </Button>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
          </div>
        </div>
      </section>

      {/* Process Overview - Complete 7 Steps */}
      <section id="process" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Complete 7-Step Career Intelligence</h2>
          <p className="text-xl text-white/70">Comprehensive career transformation journey</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: User, title: "Background Collection", desc: "Complete intake of education, skills, and goals", step: "01" },
            { icon: Search, title: "Interest Analysis", desc: "AI analyzes your profile for perfect career matches", step: "02" },
            { icon: Search, title: "Job Market Scan", desc: "Real-time scanning of thousands of job postings", step: "03" },
            { icon: FileText, title: "Path Building", desc: "Creates personalized career roadmap with action steps", step: "04" },
            { icon: FileText, title: "CV Generation", desc: "Tailored resume and cover letter for each application", step: "05" },
            { icon: Search, title: "Auto Application", desc: "Applies to relevant jobs automatically across platforms", step: "06" },
            { icon: FileText, title: "Advisory Report", desc: "Detailed recommendations for career improvement", step: "07" }
          ].map((item, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-blue-400 mb-2">STEP {item.step}</div>
                <CardTitle className="text-white text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-center">
                  {item.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="bg-black/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Intelligent Career Features</h2>
            <p className="text-xl text-white/70">Everything you need for career success, powered by AI</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Smart Profile Analysis",
                desc: "AI analyzes your background, skills, and interests to identify optimal career paths",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Real-time Job Scanning", 
                desc: "Continuously monitors job boards for fresh opportunities matching your profile",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Custom Resume Generation",
                desc: "Creates unique, ATS-optimized resumes tailored for each job application",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Automated Applications",
                desc: "Applies to relevant positions across LinkedIn, Naukri, Indeed automatically", 
                gradient: "from-orange-500 to-red-500"
              },
              {
                title: "Skills Gap Analysis",
                desc: "Identifies missing skills and recommends learning paths for career growth",
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                title: "Progress Tracking",
                desc: "Monitor application status, interview feedback, and career advancement",
                gradient: "from-teal-500 to-green-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of students who've accelerated their career success with ZaneProEd Career Agent
          </p>
          <Link to="/intake">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl font-semibold">
              Begin Your Journey Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              <span className="text-white font-bold">ZaneProEd Career Agent</span>
            </div>
            <div className="text-white/60 text-sm">
              © 2024 ZaneProEd. Transforming careers with intelligence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
