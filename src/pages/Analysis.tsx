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
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                    <p className="font-medium">{studentData.degree || 'Not specified'}</p>
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

          {/* Structured Analysis Results */}
          {structuredAnalysis ? <div className="space-y-6">
              {/* Summary */}
              {structuredAnalysis.summary && <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-navy-800">
                      <Brain className="w-5 h-5 mr-2 text-blue-500" />
                      Executive Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">{structuredAnalysis.summary}</p>
                  </CardContent>
                </Card>}

              {/* Career Recommendations */}
              {structuredAnalysis.careerRecommendations.length > 0 && <Card className="bg-white border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-navy-800">
                      <Briefcase className="w-5 h-5 mr-2 text-green-500" />
                      Career Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {structuredAnalysis.careerRecommendations.map((recommendation, index) => <div key={index} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <p className="text-slate-700">{recommendation}</p>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>}

              {/* Skill Improvements */}
              {structuredAnalysis.skillImprovements.length > 0 && <Card className="bg-white border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-navy-800">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                      Skill Development Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {structuredAnalysis.skillImprovements.map((skill, index) => <div key={index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                          <p className="text-slate-700">{skill}</p>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>}

              {/* Next Steps */}
              {structuredAnalysis.nextSteps.length > 0 && <Card className="bg-white border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-navy-800">
                      <Target className="w-5 h-5 mr-2 text-orange-500" />
                      Next Steps & Action Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {structuredAnalysis.nextSteps.map((step, index) => <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <p className="text-slate-700">{step}</p>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>}
            </div> : (/* Fallback: Raw Response */
        <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-navy-800">
                  <Brain className="w-6 h-6 mr-2 text-autumn-500" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>
                  Personalized career guidance generated by Gemini AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-6">
                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                    {geminiResult}
                  </div>
                </div>
              </CardContent>
            </Card>)}

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
    </div>;
};
export default Analysis;