import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, TrendingUp, Target, Star, ChevronRight, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('Analyzing profile...');
  
  const studentData = location.state?.studentData || {};

  const analysisPhases = [
    'Analyzing profile...',
    'Matching interests and skills...',
    'Identifying career paths...',
    'Calculating compatibility scores...',
    'Generating recommendations...'
  ];

  useEffect(() => {
    let phase = 0;
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          setIsAnalyzing(false);
          clearInterval(interval);
          return 100;
        }
        
        if (newProgress > (phase + 1) * 20) {
          phase++;
          if (phase < analysisPhases.length) {
            setCurrentPhase(analysisPhases[phase]);
          }
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const careerPaths = [
    {
      title: "Clinical Pharmacist",
      compatibility: 95,
      description: "Provide pharmaceutical care in clinical settings",
      skills: ["Clinical Knowledge", "Patient Counseling", "Drug Interactions", "Medication Therapy Management"],
      growth: "High",
      salaryRange: "6-12 LPA",
      companies: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "AIIMS"],
      reasons: [
        "Strong pharmaceutical background",
        "Clinical practice experience aligns well",
        "Growing demand in healthcare sector"
      ]
    },
    {
      title: "Regulatory Affairs Specialist",
      compatibility: 88,
      description: "Ensure pharmaceutical compliance with regulatory standards",
      skills: ["Regulatory Guidelines", "Documentation", "Quality Assurance", "Drug Approval Process"],
      growth: "Very High",
      salaryRange: "8-15 LPA",
      companies: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Lupin"],
      reasons: [
        "Attention to detail skills",
        "Pharmaceutical knowledge",
        "High industry demand"
      ]
    },
    {
      title: "Medical Affairs Manager",
      compatibility: 82,
      description: "Bridge between clinical research and commercial operations",
      skills: ["Medical Writing", "Clinical Research", "Scientific Communication", "Product Knowledge"],
      growth: "High",
      salaryRange: "10-20 LPA",
      companies: ["Novartis", "Pfizer", "GSK", "Abbott"],
      reasons: [
        "Communication skills",
        "Scientific background",
        "Leadership potential"
      ]
    },
    {
      title: "Drug Safety Associate",
      compatibility: 75,
      description: "Monitor and assess drug safety and adverse events",
      skills: ["Pharmacovigilance", "Data Analysis", "Medical Coding", "Risk Assessment"],
      growth: "High",
      salaryRange: "5-10 LPA",
      companies: ["Cognizant", "Accenture", "TCS", "Wipro"],
      reasons: [
        "Analytical thinking ability",
        "Attention to detail",
        "Safety-focused mindset"
      ]
    }
  ];

  const skillGaps = [
    { skill: "Good Clinical Practice (GCP)", priority: "High", timeToLearn: "2-3 months" },
    { skill: "Clinical Data Management", priority: "Medium", timeToLearn: "3-4 months" },
    { skill: "Pharmacovigilance & Drug Safety", priority: "High", timeToLearn: "2-3 months" },
    { skill: "Regulatory Writing", priority: "Medium", timeToLearn: "2-3 months" }
  ];

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Loader2 className="w-16 h-16 text-blue-400 mx-auto animate-spin mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Profile</h2>
              <p className="text-white/70">Our AI is processing your background to find perfect career matches</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white">{currentPhase}</span>
                <span className="text-white/70">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/intake" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Intake</span>
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
        {/* Analysis Summary */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Analysis Complete
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome, {studentData.fullName || 'Student'}!
            </h1>
            <p className="text-xl text-white/70">
              Based on your profile, we've identified the best career paths for you
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">{careerPaths.length}</div>
                <div className="text-white/70">Career Matches</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-white/70">Best Match Score</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">{skillGaps.length}</div>
                <div className="text-white/70">Skills to Learn</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">250+</div>
                <div className="text-white/70">Jobs Available</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Career Path Recommendations */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-400" />
            Recommended Career Paths
          </h2>
          
          <div className="space-y-6">
            {careerPaths.map((path, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-bold text-white mr-3">{path.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Progress value={path.compatibility} className="w-20 h-2" />
                          <span className="text-sm font-medium text-blue-400">{path.compatibility}% match</span>
                        </div>
                      </div>
                      
                      <p className="text-white/70 mb-3">{path.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Key Skills: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {path.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div><span className="text-white/60">Growth:</span> <span className="text-green-400">{path.growth}</span></div>
                          <div><span className="text-white/60">Salary:</span> <span className="text-white">{path.salaryRange}</span></div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-white/60 text-sm">Top Companies: </span>
                        <span className="text-white text-sm">{path.companies.join(', ')}</span>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-white/60 text-sm">Why this matches you:</span>
                        <ul className="mt-1 space-y-1">
                          {path.reasons.map((reason, idx) => (
                            <li key={idx} className="text-white/80 text-sm flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 lg:ml-6">
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => navigate('/job-scan', { state: { careerPath: path.title, studentData } })}
                      >
                        Find Jobs
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Gap Analysis */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
            Skills to Develop
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skillGaps.map((gap, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">{gap.skill}</h3>
                    <Badge 
                      variant={gap.priority === 'High' ? 'destructive' : 'secondary'}
                      className={gap.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}
                    >
                      {gap.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Estimated learning time: <span className="text-blue-400 font-medium">{gap.timeToLearn}</span>
                  </p>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 w-full">
                    Find Learning Resources
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Steps CTA */}
        <div className="max-w-6xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Job Search?</h2>
              <p className="text-white/80 mb-6">
                Let's scan the market for live job opportunities that match your profile
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 text-white"
                onClick={() => navigate('/job-scan', { state: { studentData } })}
              >
                Scan Job Market
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
