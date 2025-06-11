
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, TrendingUp, Target, Award, Book, Globe, Lightbulb, Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdvisoryReport = () => {
  const location = useLocation();
  const studentData = location.state?.studentData || {};

  const recommendations = [
    {
      category: "📚 Immediate Learning Priorities",
      items: [
        { 
          title: "Good Clinical Practice (GCP) Certification", 
          priority: "High", 
          timeline: "2-3 months",
          description: "Essential for clinical research roles. This certification will make you eligible for CRA and clinical positions.",
          action: "Enroll in ICH-GCP course through NIDA/ACRP"
        },
        { 
          title: "Pharmacovigilance Training", 
          priority: "High", 
          timeline: "2-3 months",
          description: "Drug safety expertise is in high demand across pharmaceutical companies.",
          action: "Complete PV certification from recognized institute"
        },
        { 
          title: "Healthcare Data Analytics", 
          priority: "Medium", 
          timeline: "4-6 months",
          description: "Learn Python/R for healthcare data analysis to enter tech-integrated pharma roles.",
          action: "Take online courses in healthcare informatics"
        }
      ]
    },
    {
      category: "🎯 Career Path Strategy",
      items: [
        {
          title: "Start with Clinical Roles",
          priority: "Recommended",
          timeline: "Immediate",
          description: "Begin with hospital pharmacy or clinical pharmacist roles to build strong foundation.",
          action: "Apply to hospitals with structured PharmD programs"
        },
        {
          title: "Industry Transition Plan",
          priority: "Medium-term",
          timeline: "2-3 years",
          description: "After gaining clinical experience, transition to pharmaceutical industry roles.",
          action: "Network with industry professionals and attend pharma conferences"
        },
        {
          title: "International Opportunities",
          priority: "Long-term",
          timeline: "3-5 years",
          description: "Consider international licensing for higher salary prospects.",
          action: "Research NAPLEX, PEBC, or DHA licensing requirements"
        }
      ]
    },
    {
      category: "🔧 Skills Development Roadmap",
      items: [
        {
          title: "Technical Skills Enhancement",
          priority: "Ongoing",
          timeline: "6-12 months",
          description: "Master pharmaceutical software, EHR systems, and clinical decision support tools.",
          action: "Practice with Epic, Cerner, and clinical pharmacy software"
        },
        {
          title: "Leadership & Communication",
          priority: "Medium",
          timeline: "Ongoing",
          description: "Develop leadership skills for management roles and enhance patient communication.",
          action: "Take leadership courses and practice public speaking"
        },
        {
          title: "Research & Writing Skills",
          priority: "Medium",
          timeline: "3-6 months",
          description: "Develop medical writing and research skills for regulatory and academic roles.",
          action: "Practice writing case studies and research papers"
        }
      ]
    },
    {
      category: "🌐 Network Building Strategy",
      items: [
        {
          title: "Professional Associations",
          priority: "High",
          timeline: "Immediate",
          description: "Join IPA, ISPOR, and other pharmacy organizations for networking.",
          action: "Register for membership and attend conferences"
        },
        {
          title: "LinkedIn Professional Profile",
          priority: "High", 
          timeline: "1 week",
          description: "Build a strong LinkedIn presence showcasing your PharmD expertise.",
          action: "Optimize profile with pharmaceutical keywords and connect with industry professionals"
        },
        {
          title: "Mentorship",
          priority: "Medium",
          timeline: "1-2 months",
          description: "Find mentors in your target career areas for guidance and opportunities.",
          action: "Reach out to senior professionals for informational interviews"
        }
      ]
    }
  ];

  const careerMetrics = {
    overallReadiness: 78,
    technicalSkills: 72,
    experienceLevel: 65,
    marketDemand: 85,
    competitivePosition: 70
  };

  const marketInsights = [
    {
      title: "High Demand Sectors",
      content: "Clinical research, drug safety, and hospital pharmacy showing 40% growth in job postings",
      trend: "positive"
    },
    {
      title: "Salary Trends",
      content: "PharmD graduates commanding 15-30% premium over B.Pharm in clinical roles",
      trend: "positive"
    },
    {
      title: "Skill Gaps",
      content: "Digital health literacy and data analysis skills are becoming essential requirements",
      trend: "neutral"
    },
    {
      title: "Geographic Opportunities",
      content: "Bangalore, Hyderabad, and Mumbai offer 60% of high-paying PharmD positions",
      trend: "positive"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/analysis" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Analysis</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-bold text-xl">ZaneProEd Career Agent</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4 mr-2" />
              Comprehensive Career Advisory Report
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Personalized Career Guidance
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Comprehensive recommendations to accelerate your pharmaceutical career
            </p>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mb-8">
              <Download className="w-5 h-5 mr-2" />
              Download Full Report (PDF)
            </Button>
          </div>

          {/* Career Readiness Dashboard */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {Object.entries(careerMetrics).map(([key, value]) => (
              <Card key={key} className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-400 mb-2">{value}%</div>
                  <div className="text-white/70 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <Progress value={value} className="mt-3 h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Market Insights */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                Market Insights & Trends
              </CardTitle>
              <CardDescription className="text-white/70">
                Current pharmaceutical job market analysis for PharmD graduates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4">
                    <h4 className="text-white font-semibold mb-2">{insight.title}</h4>
                    <p className="text-white/80 text-sm">{insight.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Recommendations */}
          <div className="space-y-8">
            {recommendations.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    {sectionIndex === 0 && <Book className="w-6 h-6 mr-2 text-blue-400" />}
                    {sectionIndex === 1 && <Target className="w-6 h-6 mr-2 text-blue-400" />}
                    {sectionIndex === 2 && <Award className="w-6 h-6 mr-2 text-blue-400" />}
                    {sectionIndex === 3 && <Globe className="w-6 h-6 mr-2 text-blue-400" />}
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border border-white/10 rounded-lg p-6 hover:bg-white/5 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}
                              className={
                                item.priority === 'High' ? 'bg-red-500/20 text-red-300' : 
                                item.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-blue-500/20 text-blue-300'
                              }
                            >
                              {item.priority}
                            </Badge>
                            <Badge variant="outline" className="border-white/30 text-white/70">
                              {item.timeline}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-white/80 mb-3">{item.description}</p>
                        
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                          <div className="flex items-start">
                            <Lightbulb className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-blue-300 font-medium text-sm">Action Step: </span>
                              <span className="text-white/90 text-sm">{item.action}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps CTA */}
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30 backdrop-blur-sm mt-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Implement Your Career Plan?</h2>
              <p className="text-white/80 mb-6">
                Schedule a 1-on-1 consultation with our career advisors to create a detailed action plan
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                >
                  Schedule Consultation
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8"
                >
                  View Learning Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryReport;
