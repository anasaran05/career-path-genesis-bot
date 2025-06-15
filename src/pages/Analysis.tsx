import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Brain, TrendingUp, Target, Star, ChevronRight, Loader2, Sparkles, Briefcase, GraduationCap, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResultCards } from "@/components/AnalysisResultCards";
import { Wrench, MessageSquare, Microscope } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
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
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-800 via-blue-900 to-autumn-800 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-28 left-[-100px] w-[420px] h-[420px] bg-gradient-to-br from-autumn-400 to-orange-400 rounded-[50%] blur-3xl opacity-20 animate-spin-slow z-0" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-gradient-to-br from-blue-400 via-blue-600 to-navy-800 rounded-[50%] blur-2xl opacity-25 animate-spin-reverse z-0" />
        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl max-w-md w-full mx-4 animate-scale-in relative z-10">
          <CardContent className="p-10 text-center">
            <div className="mb-6">
              <div className="relative mb-6">
                <Brain className="w-20 h-20 text-navy-600 mx-auto animate-[bounce_2s_infinite]" />
                <Sparkles className="w-7 h-7 text-autumn-500 absolute top-2 left-[65%] animate-pulse" />
              </div>
              <h2 className="text-3xl font-extrabold text-navy-800 mb-2 tracking-wide drop-shadow-md animate-fade-in">
                Analyzing with Zane AI...
              </h2>
              <p className="text-lg text-slate-600/80 font-medium">Revolutionizing your career journey—hang tight!</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-base font-mono">
                <span className="text-navy-700 font-semibold animate-fade-in">{currentPhase}</span>
                <span className="text-slate-500">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-3 bg-slate-200 rounded-2xl shadow-inner shadow-navy-300/30" />
            </div>
          </CardContent>
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

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-navy-900 via-blue-800 to-autumn-800 overflow-hidden">
      {/* Background Floating Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[760px] h-[760px] bg-gradient-to-br from-autumn-600/30 via-autumn-300/40 to-blue-300/30 rounded-full blur-3xl opacity-40 -z-10 animate-spin-slow" />
      <div className="absolute bottom-[-160px] right-[-180px] w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/20 via-navy-600/40 to-navy-800/5 rounded-full blur-2xl opacity-20 -z-10 animate-spin-reverse" />

      {/* Header */}
      <header className="border-b border-slate-200/30 bg-white/10 backdrop-blur-lg shadow-md">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <Link to="/intake" className="flex items-center space-x-2 text-navy-100 hover:text-autumn-300 transition-colors font-medium">
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Intake</span>
          </Link>
          <div className="flex items-center space-x-3 select-none">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-700 to-autumn-500 rounded-lg flex items-center justify-center shadow-lg animate-glow">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-white font-bold text-2xl tracking-wide">Zane AI</span>
              <p className="text-autumn-200 text-xs">by ZaneProEd</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 animate-fade-in">
        <div className="max-w-6xl mx-auto mb-12">
          {/* Modern Shine Section */}
          <div className="text-center mb-12 ">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-autumn-300 via-green-100 to-blue-100 text-navy-800 rounded-full text-lg font-bold mb-7 shadow-lg animate-scale-in tracking-wider animate-fade-in">
              <Brain className="w-7 h-7 mr-2 animate-spin-slow" />
              🎉 Analysis Complete
            </div>
            <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-4 tracking-wide animate-fade-in animate-scale-in">
              Your <span className="text-autumn-300 animate-glow">AI Career Analysis</span>
            </h1>
            <p className="text-2xl text-navy-100/90 mb-2 font-medium">Welcome, <span className="font-bold">{studentData.fullName || "Future Professional"}!</span></p>
            <p className="text-xl text-blue-100/90 drop-shadow mb-2">Your personalized journey, decoded by <span className="font-semibold text-autumn-200">Zane AI</span></p>
          </div>

          {/* Profile Glass Card */}
          <Card className="bg-gradient-to-tr from-white/80 to-blue-50/80 border-0 shadow-xl backdrop-blur-2xl mb-10 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-navy-800/90 font-extrabold tracking-wider">
                <User className="w-8 h-8 mr-2 text-autumn-500 animate-bounce" />
                Your Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-6 h-6 text-blue-500 animate-wiggle" />
                  <div>
                    <p className="text-base text-navy-700/70 font-medium">Degree</p>
                    <p className="font-extrabold tracking-wider text-lg">{displayedDegree}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-green-400 animate-pulse" />
                  <div>
                    <p className="text-base text-navy-700/70 font-medium">Career Goals</p>
                    <p className="font-semibold text-lg">{studentData.goals || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-400 animate-bounce" />
                  <div>
                    <p className="text-base text-navy-700/70 font-medium">Skills</p>
                    <p className="font-semibold text-lg">{studentData.skills || 'Not specified'}</p>
                  </div>
                </div>
              </div>
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
            <Card className="bg-white/80 shadow-2xl border-0 backdrop-blur-lg animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-navy-800 font-extrabold tracking-wide animate-fade-in">
                  <Brain className="w-8 h-8 mr-3 text-autumn-500 animate-spin-slow" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription className="text-base text-blue-700/70">Personalized career guidance powered by Gemini AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50/80 rounded-xl p-8">
                  <div className="whitespace-pre-wrap text-navy-900 leading-relaxed font-medium">
                    {geminiResult}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-to-br from-navy-700 via-blue-600 to-autumn-500 hover:from-navy-500 hover:to-autumn-400 text-white px-9 py-4 rounded-2xl shadow-2xl text-xl font-bold tracking-wide hover:shadow-blue-300/40 animate-glow transition-all duration-300 hover:scale-110"
              onClick={() =>
                navigate('/job-scan', {
                  state: {
                    studentData
                  }
                })
              }
            >
              Find Jobs Based on Analysis
              <ChevronRight className="w-6 h-6 ml-2 animate-bounce" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/intake')}
              className="border-2 border-navy-200 bg-navy-50/70 text-navy-700 font-bold px-9 py-4 rounded-2xl text-xl hover:bg-navy-100 hover:scale-105 shadow-md transition-all"
            >
              New Analysis
            </Button>
          </div>
        </div>

        {/* Footer Logo */}
        <div className="text-center mt-20 pb-10">
          <div className="flex items-center justify-center space-x-3 text-slate-200/70">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-400 to-autumn-400 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <span className="text-lg">Powered by <span className="font-bold text-autumn-200 tracking-wide">ZaneProEd & Zane AI</span></span>
          </div>
        </div>
      </div>

      {/* Extra Keyframe Animations */}
      <style>{`
        @keyframes spin-slow { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
        .animate-spin-slow { animation: spin-slow 9s linear infinite !important; }
        @keyframes spin-reverse { 0%{transform:rotate(360deg);} 100%{transform:rotate(0deg);} }
        .animate-spin-reverse { animation: spin-reverse 12s linear infinite !important; }
        @keyframes wiggle { 0%,100%{transform:rotate(-5deg);} 50%{transform:rotate(7deg);} }
        .animate-wiggle { animation: wiggle 1.3s ease-in-out infinite; }
        @keyframes glow { 0% { box-shadow: 0 0 12px #fbbf24, 0 0 0px #fff;} 50% { box-shadow: 0 0 24px #fbbf24, 0 0 8px #fff;} }
        .animate-glow { animation: glow 2.5s alternate infinite;}
      `}</style>
    </div>
  );
};
export default Analysis;
