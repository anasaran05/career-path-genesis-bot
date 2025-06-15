import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Brain, TrendingUp, Target, Star, ChevronRight, Loader2, Sparkles, Briefcase, GraduationCap, User, Zap, Rocket, Award } from "lucide-react";
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-slate-900 to-navy-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-autumn-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-navy-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl max-w-lg w-full mx-4 animate-scale-in relative overflow-hidden">
          {/* Animated border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-autumn-500 via-blue-500 to-navy-500 rounded-lg blur opacity-75 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-autumn-500 to-blue-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                  <Brain className="relative w-20 h-20 text-white mx-auto animate-bounce drop-shadow-2xl" />
                  <Sparkles className="w-8 h-8 text-autumn-400 absolute -top-2 -right-2 animate-spin" />
                  <Zap className="w-6 h-6 text-blue-400 absolute -bottom-1 -left-1 animate-ping" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-autumn-400 via-white to-blue-400 bg-clip-text text-transparent">
                  🧠 Zane AI Analyzing
                </h2>
                <p className="text-white/80 text-lg">Processing your pharmaceutical profile with cutting-edge AI</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium animate-pulse">{currentPhase}</span>
                  <span className="text-autumn-300 font-bold">{analysisProgress}%</span>
                </div>
                <div className="relative">
                  <Progress value={analysisProgress} className="h-4 bg-white/20 border border-white/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-autumn-500 via-blue-500 to-navy-500 rounded-full opacity-20 animate-pulse"></div>
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-autumn-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-3 h-3 bg-navy-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
  
  // Pull degree from user input: prefer PG then UG
  const displayedDegreeRaw = studentData.pgDegree?.trim()
    ? studentData.pgDegree
    : studentData.ugDegree?.trim()
      ? studentData.ugDegree
      : "Not specified";

  const displayedDegree = displayedDegreeRaw ? displayedDegreeRaw.toUpperCase() : "NOT SPECIFIED";

  // FAKE DATA: Example parsed (in real use, you would extract these from Gemini response structured as needed)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-slate-900 to-navy-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-autumn-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-navy-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-autumn-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/intake" className="flex items-center space-x-2 text-white hover:text-autumn-300 transition-all duration-300 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Intake</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-autumn-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl bg-gradient-to-r from-autumn-400 to-blue-400 bg-clip-text text-transparent">Zane AI</span>
              <p className="text-white/60 text-xs">by ZaneProEd</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto mb-8">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-green-300 rounded-full text-sm font-medium mb-6 border border-green-400/30">
              <Brain className="w-5 h-5 mr-2 animate-pulse" />
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              🎉 Analysis Complete
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-autumn-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              Your AI Career Analysis
            </h1>
            <p className="text-2xl text-white/80 mb-2">
              Welcome, <span className="text-autumn-300 font-semibold">{studentData.fullName || 'Future Professional'}</span>!
            </p>
            <p className="text-lg text-white/60">Here's your personalized career analysis powered by Zane AI</p>
          </div>

          {/* Profile Summary */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl mb-8 hover:bg-white/15 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-autumn-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center text-2xl text-white">
                <div className="w-8 h-8 bg-gradient-to-r from-autumn-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                Your Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Degree</p>
                    <p className="font-bold text-white text-lg">{displayedDegree}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Career Goals</p>
                    <p className="font-bold text-white text-lg">{studentData.goals || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Skills</p>
                    <p className="font-bold text-white text-lg">{studentData.skills || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NEW: Modern Card-Based Analysis Display */}
          {parsedData ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-autumn-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
              <AnalysisResultCards
                topRoles={parsedData.topRoles}
                roadmap={parsedData.roadmap}
                courses={parsedData.courses}
                skillGaps={parsedData.skillGaps}
                onReanalyze={handleReanalyze}
              />
            </div>
          ) : (
            // Enhanced fallback for Gemini response
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl animate-fade-in group">
              {/* Animated glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-autumn-500 via-blue-500 to-navy-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-autumn-400/30 to-transparent rounded-full blur-2xl animate-pulse"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                <CardHeader className="flex flex-col items-center relative">
                  <div className="absolute -top-4 right-6 z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-autumn-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                      <Sparkles className="w-6 h-6 text-white animate-spin" />
                    </div>
                  </div>
                  <CardTitle className="flex items-center gap-4 text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-autumn-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <span className="bg-gradient-to-r from-autumn-400 via-white to-blue-400 bg-clip-text text-transparent">
                      Gemini AI Analysis
                    </span>
                  </CardTitle>
                  <CardDescription className="text-xl text-white/70 mt-2">Your personalized career insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-inner relative overflow-hidden">
                    {/* Subtle animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-autumn-500/5 animate-pulse"></div>
                    
                    <div className="relative whitespace-pre-wrap text-white font-medium leading-relaxed text-lg md:text-xl border-l-4 border-gradient-to-b from-autumn-400 to-blue-400 pl-6 shadow-lg">
                      {geminiResult}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-autumn-500 via-orange-500 to-red-500 hover:from-autumn-600 hover:via-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-autumn-500/50 transition-all duration-500 hover:scale-110 transform group text-lg font-bold"
              onClick={() => navigate('/job-scan', { state: { studentData } })}
            >
              <Rocket className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Find Dream Jobs
              <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/intake')} 
              className="border-2 border-white/30 hover:bg-white/10 text-white px-10 py-4 rounded-2xl backdrop-blur-sm hover:border-white/50 transition-all duration-300 hover:scale-105 text-lg font-bold"
            >
              <Award className="w-6 h-6 mr-3" />
              New Analysis
            </Button>
          </div>
        </div>

        {/* Enhanced Footer Logo */}
        <div className="text-center mt-20 pb-8">
          <div className="flex items-center justify-center space-x-4 text-white/60 group">
            <div className="w-8 h-8 bg-gradient-to-r from-autumn-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg group-hover:text-white/80 transition-colors">Powered by ZaneProEd & Zane AI</span>
            <Sparkles className="w-5 h-5 text-autumn-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
