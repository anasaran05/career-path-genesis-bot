import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Brain, TrendingUp, Target, Star, ChevronRight, Loader2, Sparkles, Briefcase, GraduationCap, User, CheckCircle, Circle, ChevronDown, ChevronUp, Clock, Award } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResultCards } from "@/components/AnalysisResultCards";
import { Wrench, MessageSquare, Microscope } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [geminiResponse, setGeminiResponse] = useState('');
  const [geminiResult, setGeminiResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('Loading your analysis...');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  
  const studentData = location.state?.studentData || {};
  const analysisResult = location.state?.analysisResult;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // Get current user
        const {
          data: {
            user
          },
          error: authError
        } = await supabase.auth.getUser();
        if (authError || !user) {
          toast({
            title: "Authentication Error",
            description: "Please log in to view your analysis",
            variant: "destructive"
          });
          navigate('/auth');
          return;
        }

        // If we have analysis result from navigation state, use it
        if (analysisResult?.analysis) {
          setGeminiResponse(analysisResult.analysis);
          setGeminiResult(analysisResult.analysis);
          setIsLoading(false);
          return;
        }

        // Otherwise, fetch the latest analysis from database
        const {
          data: analysisData,
          error: fetchError
        } = await supabase.from('career_analysis').select('analysis_result').eq('user_id', user.id).order('created_at', {
          ascending: false
        }).limit(1).single();
        if (fetchError) {
          console.error('Fetch error:', fetchError);
          toast({
            title: "Error",
            description: "Failed to load your analysis. Please try again.",
            variant: "destructive"
          });
          setGeminiResponse('No analysis found. Please complete the intake form first.');
          setGeminiResult('No analysis found. Please complete the intake form first.');
        } else {
          const result = analysisData.analysis_result || 'No analysis data available.';
          setGeminiResponse(result);
          setGeminiResult(result);
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
        const errorMsg = 'Error loading analysis. Please try again.';
        setGeminiResponse(errorMsg);
        setGeminiResult(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          setIsAnalyzing(false);
          clearInterval(progressInterval);
          fetchAnalysis();
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, [analysisResult, navigate, toast]);

  // Function to parse and structure the Gemini response
  const parseGeminiResponse = response => {
    if (!response) return null;

    // Split response into sections
    const sections = response.split('\n\n').filter(section => section.trim());
    const structuredData = {
      summary: '',
      careerRecommendations: [],
      skillImprovements: [],
      nextSteps: [],
      industryInsights: []
    };
    sections.forEach(section => {
      const lowerSection = section.toLowerCase();
      if (lowerSection.includes('career') && lowerSection.includes('recommend')) {
        structuredData.careerRecommendations.push(section);
      } else if (lowerSection.includes('skill') || lowerSection.includes('improve')) {
        structuredData.skillImprovements.push(section);
      } else if (lowerSection.includes('next step') || lowerSection.includes('action')) {
        structuredData.nextSteps.push(section);
      } else if (lowerSection.includes('industry') || lowerSection.includes('market')) {
        structuredData.industryInsights.push(section);
      } else if (!structuredData.summary) {
        structuredData.summary = section;
      }
    });
    return structuredData;
  };
  const structuredAnalysis = parseGeminiResponse(geminiResult);
  if (isAnalyzing || isLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="bg-white border-slate-200 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="relative mb-6">
                <Brain className="w-16 h-16 text-navy-600 mx-auto animate-pulse" />
                <Sparkles className="w-6 h-6 text-autumn-500 absolute top-0 right-6 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800 mb-2">Zane AI is Analyzing</h2>
              <p className="text-slate-600">Processing your pharmaceutical profile to find perfect career matches</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy-700 font-medium">{currentPhase}</span>
                <span className="text-slate-500">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-3 bg-slate-100" />
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  
  // Pull degree from user input: prefer PG then UG
  const displayedDegreeRaw = studentData.pgDegree?.trim()
    ? studentData.pgDegree
    : studentData.ugDegree?.trim()
      ? studentData.ugDegree
      : "Not specified";

  const displayedDegree = displayedDegreeRaw ? displayedDegreeRaw.toUpperCase() : "NOT SPECIFIED";

  // FAKE DATA: Example parsed (in real use, you would extract these from Gemini response structured as needed)
  // Mapping parseGeminiResponse output to new fancy component structure (for demo/fake data)
  const parsedData =
    geminiResult && typeof geminiResult === "string"
      ? {
          topRoles: [
            {
              title: "Clinical Research Associate",
              description: "Coordinate clinical trials and bridge research teams with pharma companies.",
            },
            {
              title: "Regulatory Affairs Specialist",
              description: "Ensure compliance and global documentation for new pharma products.",
            },
            {
              title: "Medical Writer",
              description: "Craft clinical study reports and clear communication for stakeholders.",
            },
          ],
          roadmap: [
            "Complete GCP Certification and Clinical Trials training",
            "Intern with a CRO (Clinical Research Organization)",
            "Take an online course in pharmacovigilance tools",
            "Build a LinkedIn profile tailored to the pharma industry",
          ],
          courses: [
            "ICH-GCP Certification",
            "Regulatory Affairs Masterclass",
            "Pharmacovigilance Workshop"
          ],
          skillGaps: [
            { gap: "Technical: Advanced GCP & pharmacovigilance tools", icon: <Wrench className="inline w-4 h-4 text-navy-600" /> },
            { gap: "Soft: Professional communication", icon: <MessageSquare className="inline w-4 h-4 text-autumn-500" /> },
            { gap: "Scientific: Research methods", icon: <Microscope className="inline w-4 h-4 text-blue-600" /> }
          ],
        }
      : null;
  
  // Re-analyze click handler: redirects to intake for new analysis
  const handleReanalyze = () => {
    navigate('/intake');
  };

  // Interactive roadmap data
  const roadmapSteps = [
    {
      id: 1,
      title: "Complete GCP Certification",
      description: "Master Good Clinical Practice guidelines essential for pharmaceutical careers",
      duration: "2-3 weeks",
      priority: "High",
      resources: ["ICH-GCP E6 Guidelines", "Online certification course", "Practice tests"],
      details: "This certification is mandatory for clinical research roles and demonstrates your understanding of ethical and scientific quality standards."
    },
    {
      id: 2,
      title: "Learn Pharmacovigilance Tools",
      description: "Gain expertise in drug safety monitoring and adverse event reporting",
      duration: "3-4 weeks",
      priority: "High",
      resources: ["Argus Safety training", "CIOMS forms practice", "PvPI certification"],
      details: "Pharmacovigilance is a growing field with excellent career prospects in both pharma companies and regulatory bodies."
    },
    {
      id: 3,
      title: "Build Professional Network",
      description: "Connect with industry professionals and join relevant associations",
      duration: "Ongoing",
      priority: "Medium",
      resources: ["LinkedIn optimization", "Industry conferences", "Professional associations"],
      details: "Networking is crucial for uncovering hidden job opportunities and staying updated with industry trends."
    },
    {
      id: 4,
      title: "Apply for CRO Internships",
      description: "Gain hands-on experience with Clinical Research Organizations",
      duration: "1-2 months",
      priority: "High",
      resources: ["Company research", "Application strategy", "Interview preparation"],
      details: "CRO experience provides excellent foundation for pharmaceutical careers and often leads to full-time opportunities."
    }
  ];

  const toggleStepCompletion = (stepId: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const toggleStepExpansion = (stepId: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const getProgressPercentage = () => {
    return (completedSteps.size / roadmapSteps.length) * 100;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/intake" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Intake</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-lg">Zane AI</span>
              <p className="text-slate-500 text-xs">by ZaneProEd</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mb-8">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4 mr-2" />
              🎉 Analysis Complete
            </div>
            <h1 className="text-4xl font-bold text-navy-800 mb-4">
              Your AI Career Analysis
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Welcome, {studentData.fullName || 'Future Professional'}!
            </p>
            <p className="text-lg text-slate-600">Here's your personalized career analysis powered by Zane AI</p>
          </div>

          {/* Profile Summary */}
          <Card className="bg-white border-slate-200 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-navy-800">
                <User className="w-5 h-5 mr-2 text-autumn-500" />
                Your Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-500">Degree</p>
                    <p className="font-medium">{displayedDegree}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-slate-500">Career Goals</p>
                    <p className="font-medium">{studentData.goals || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-slate-500">Skills</p>
                    <p className="font-medium">{studentData.skills || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Roadmap Section */}
          <Card className="bg-white border-slate-200 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl text-navy-800">
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-autumn-500" />
                  Your Personalized Roadmap
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">{completedSteps.size}/{roadmapSteps.length} completed</span>
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
              </CardTitle>
              <CardDescription>
                Track your progress and unlock your pharmaceutical career potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress Overview */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-navy-700">Overall Progress</span>
                  <span className="text-sm text-slate-600">{Math.round(getProgressPercentage())}%</span>
                </div>
                <Progress value={getProgressPercentage()} className="h-3" />
              </div>

              {/* Roadmap Steps */}
              <div className="space-y-4">
                {roadmapSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`border rounded-lg transition-all duration-300 hover:shadow-md ${
                      completedSteps.has(step.id) ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Step Number & Checkbox */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            completedSteps.has(step.id) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-navy-100 text-navy-600'
                          }`}>
                            {completedSteps.has(step.id) ? '✓' : index + 1}
                          </div>
                          <button
                            onClick={() => toggleStepCompletion(step.id)}
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                          >
                            {completedSteps.has(step.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                            )}
                          </button>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className={`font-semibold text-lg ${
                                completedSteps.has(step.id) ? 'text-green-700' : 'text-navy-800'
                              }`}>
                                {step.title}
                              </h3>
                              <p className="text-slate-600 mt-1">{step.description}</p>
                            </div>
                            <button
                              onClick={() => toggleStepExpansion(step.id)}
                              className="ml-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                              {expandedSteps.has(step.id) ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center space-x-4 mb-3">
                            <Badge className={getPriorityColor(step.priority)}>
                              {step.priority} Priority
                            </Badge>
                            <div className="flex items-center text-sm text-slate-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {step.duration}
                            </div>
                          </div>

                          {/* Expanded Content */}
                          {expandedSteps.has(step.id) && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg animate-fade-in">
                              <p className="text-slate-700 mb-4">{step.details}</p>
                              
                              <div>
                                <h4 className="font-medium text-navy-700 mb-2">Resources & Tools:</h4>
                                <ul className="space-y-1">
                                  {step.resources.map((resource, resourceIndex) => (
                                    <li key={resourceIndex} className="flex items-center text-sm text-slate-600">
                                      <div className="w-1.5 h-1.5 bg-autumn-400 rounded-full mr-2"></div>
                                      {resource}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Celebration */}
              {completedSteps.size === roadmapSteps.length && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-center animate-scale-in">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Congratulations!</h3>
                  <p className="text-green-600">You've completed your personalized roadmap. You're ready for your pharmaceutical career!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* NEW: Modern Card-Based Analysis Display */}
          {parsedData ? (
            <AnalysisResultCards
              topRoles={parsedData.topRoles}
              roadmap={parsedData.roadmap}
              courses={parsedData.courses}
              skillGaps={parsedData.skillGaps}
              onReanalyze={handleReanalyze}
            />
          ) : (
            // 👇 Enhanced fallback for Gemini response
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-100/70 via-blue-50/70 to-autumn-100/70 rounded-3xl animate-fade-in-glass backdrop-blur-lg">
              {/* Animated Glow & Sparkle */}
              <div className="absolute -top-4 right-6 z-10 animate-pulse">
                <span className="inline-block p-2 rounded-full bg-gradient-to-br from-autumn-400 via-yellow-200 to-blue-200 opacity-70 shadow-2xl">
                  <svg className="w-6 h-6 text-autumn-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464"/>
                  </svg>
                </span>
              </div>
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-navy-800 drop-shadow-xl">
                  <span className="bg-gradient-to-br from-autumn-500 via-blue-400 to-green-400 bg-clip-text text-transparent pr-2">
                    <svg className="w-7 h-7 mr-1 inline -mt-1 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M8 10h.01M16 10h.01M12 17c2 0 3.8-1.4 4-3h-8c.2 1.6 2 3 4 3z" />
                    </svg>
                  </span>
                  <span>Gemini AI Says...</span>
                </CardTitle>
                <CardDescription className="text-lg text-slate-500 mt-1">Your personalized career analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white/80 border border-slate-100 backdrop-blur-md rounded-2xl p-8 shadow-inner relative">
                  <div className="whitespace-pre-wrap text-navy-800 font-medium leading-relaxed text-lg md:text-xl animate-typewriter border-l-4 border-autumn-400 pl-6">
                    {geminiResult}
                  </div>
                  {/* Subtle shine effect */}
                  <div className="pointer-events-none absolute top-0 left-1/4 w-1/2 h-12 bg-gradient-to-r from-blue-200/40 via-white/70 to-autumn-200/30 rounded-full blur-lg opacity-70 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => navigate('/job-scan', {
            state: {
              studentData
            }
          })}>
              Find Jobs Based on Analysis
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/intake')} className="border-2 border-navy-300 hover:bg-navy-50 px-8 rounded-xl">
              New Analysis
            </Button>
          </div>
        </div>

        {/* Footer Logo */}
        <div className="text-center mt-16 pb-8">
          <div className="flex items-center justify-center space-x-3 text-slate-400">
            <div className="w-6 h-6 bg-gradient-to-r from-navy-400 to-autumn-400 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Powered by ZaneProEd &amp; Zane AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analysis;
