import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Loader2, Target, BookOpen, Wrench, MessageSquare, Microscope, RefreshCw, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import CareerMatchCards from "@/components/CareerMatchCards";

interface AnalysisResult {
  topRoles: Array<{
    title: string;
    description: string;
    emoji: string;
    matchScore?: number;
  }>;
  roadmap: Array<{
    step: string;
    emoji: string;
  }>;
  skillsTodev: Array<{
    skill: string;
    category: 'Technical' | 'Soft' | 'Scientific';
    description: string;
  }>;
  courses: Array<{
    name: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;
  summary?: string;
}

const CareerAnalysis = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState('');
  const [goal, setGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [userProfileData, setUserProfileData] = useState<{degree: string, skills: string, goal: string} | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (userProfile?.user_type === 'recruiter') {
      navigate('/recruiter-dashboard');
      return;
    }
  }, [user, userProfile, navigate]);

  // Load existing profile data
  useEffect(() => {
    if (userProfile) {
      setDegree(userProfile.student_profiles?.degree || '');
      setSkills(userProfile.student_profiles?.skills?.join(', ') || '');
      setGoal(userProfile.student_profiles?.career_interests?.join(', ') || '');
    }
  }, [userProfile]);

  const analysisPhases = [
    '🔍 Analyzing your educational background...',
    '🎯 Evaluating your skills and experience...',
    '🧠 AI processing career compatibility...',
    '📊 Generating personalized recommendations...',
    '✨ Finalizing your career roadmap...'
  ];

  const handleAnalyze = async () => {
    if (!degree.trim()) {
      toast({
        title: "Degree Required",
        description: "Please enter your degree to get personalized career analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setUserProfileData(null);
    setAnalysisProgress(0);
    setCurrentPhase(analysisPhases[0]);
    
    // Simulate progress
    let phase = 0;
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress > (phase + 1) * 20 && phase < analysisPhases.length - 1) {
          phase++;
          setCurrentPhase(analysisPhases[phase]);
        }
        return Math.min(newProgress, 95);
      });
    }, 100);

    try {
      console.log('Analyzing profile:', { degree: degree.trim(), skills: skills.trim(), goal: goal.trim() });

      const { data, error } = await supabase.functions.invoke('analysis', {
        body: {
          degree: degree.trim(),
          skills: skills.trim() || undefined,
          goal: goal.trim() || undefined
        }
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setCurrentPhase('✅ Analysis complete!');

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Analysis response:', data);

      if (data.success) {
        // Add match scores to roles
        const rolesWithScores = data.analysis.topRoles.map((role: any, index: number) => ({
          ...role,
          matchScore: 95 - (index * 5) + Math.floor(Math.random() * 5)
        }));

        setAnalysisResult({
          ...data.analysis,
          topRoles: rolesWithScores,
          summary: `Based on your ${degree.trim()} background, here are the career paths where you'll excel the most.`
        });
        setUserProfileData(data.userProfile);

        // Save to database
        await saveAnalysisToDatabase(data.analysis, degree, skills, goal);

        toast({
          title: "✅ Analysis Complete",
          description: `Personalized career analysis generated for ${degree.trim()}`,
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Analysis error:', error);
      toast({
        title: "❌ Analysis Failed",
        description: "Could not generate personalized analysis. Please check your inputs and try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveAnalysisToDatabase = async (analysis: AnalysisResult, degree: string, skills: string, goal: string) => {
    try {
      const { error } = await supabase.from('career_analysis').insert([{
        user_id: user?.id,
        degree: degree,
        skills: skills,
        goals: goal,
        analysis_result: JSON.stringify(analysis)
      }]);

      if (error) {
        console.error('Error saving analysis:', error);
      }
    } catch (error) {
      console.error('Database save error:', error);
    }
  };

  const handleReAnalyze = () => {
    setDegree('');
    setSkills('');
    setGoal('');
    setAnalysisResult(null);
    setUserProfileData(null);
    setAnalysisProgress(0);
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Technical': return <Wrench className="w-4 h-4 text-autumn-500" />;
      case 'Soft': return <MessageSquare className="w-4 h-4 text-navy-600" />;
      case 'Scientific': return <Microscope className="w-4 h-4 text-blue-600" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 max-w-lg w-full mx-4 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="w-20 h-20 border-4 border-navy-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-navy-600 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Zane AI is analyzing your profile...</h2>
              <p className="text-navy-600">Generating personalized career insights just for you</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy-700">{currentPhase}</span>
                <span className="text-navy-500">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/student-dashboard" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-navy-800">Career Analysis</h1>
            <p className="text-sm text-navy-500">Powered by Zane AI</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-navy-800 font-bold text-lg">Zane AI</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Input Form */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-navy-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-autumn-500" />
              Tell Zane AI About Your Background
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Degree <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., B.Pharm, PharmD, M.Pharm in Pharmacology"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border-slate-200 focus:border-navy-500 rounded-xl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Skills (Optional)
              </label>
              <Textarea
                placeholder="e.g., Research, Clinical trials, Data analysis, Communication"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="border-slate-200 focus:border-navy-500 min-h-[80px] rounded-xl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Career Goal (Optional)
              </label>
              <Input
                placeholder="e.g., Work in pharmaceutical industry, Clinical research, Regulatory affairs"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="border-slate-200 focus:border-navy-500 rounded-xl"
              />
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Your Career Path...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze Career Path
                  </>
                )}
              </Button>
              
              {analysisResult && (
                <Button
                  onClick={handleReAnalyze}
                  variant="outline"
                  className="border-2 border-navy-300 text-navy-700 hover:bg-navy-50 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Profile Display */}
        {userProfileData && (
          <Card className="bg-blue-50 border-blue-200 mb-6 animate-fade-in">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Analysis Based On:</span>
              </div>
              <div className="text-sm text-blue-700">
                <strong>Degree:</strong> {userProfileData.degree} | 
                <strong> Skills:</strong> {userProfileData.skills || 'Not specified'} | 
                <strong> Goal:</strong> {userProfileData.goal || 'Open to opportunities'}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-8 animate-fade-in">
            {/* Career Match Cards */}
            <CareerMatchCards
              roles={analysisResult.topRoles}
              summary={analysisResult.summary}
            />

            {/* Detailed Analysis Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Skills Development */}
              <Card className="bg-white shadow-xl border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-autumn-500" />
                    Skills to Develop
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.skillsTodev.map((skill, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center mb-2">
                          {getSkillIcon(skill.category)}
                          <span className="font-semibold text-navy-800 ml-2">{skill.skill}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Courses */}
              <Card className="bg-white shadow-xl border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-navy-800 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    Recommended Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="font-medium text-navy-800">{course.name}</span>
                        <Badge className={getPriorityColor(course.priority)}>
                          {course.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Career Roadmap */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-navy-800 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-500" />
                  Your Career Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.roadmap.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                      <div className="text-2xl">{step.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="w-6 h-6 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-navy-800">Step {index + 1}</span>
                        </div>
                        <p className="text-slate-700">{step.step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 rounded-xl shadow-lg"
                onClick={() => navigate('/job-scan', { state: { analysisResult, userProfileData } })}
              >
                Find Matching Jobs
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-navy-300 text-navy-700 hover:bg-navy-50 px-8 rounded-xl"
                onClick={() => navigate('/advisory-report', { state: { analysisResult, userProfileData } })}
              >
                Get Detailed Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAnalysis;