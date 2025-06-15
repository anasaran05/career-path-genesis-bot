import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, Target, BookOpen, Wrench, MessageSquare, Microscope, RefreshCw, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CareerMatchCards from "@/components/CareerMatchCards";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface AnalysisResult {
  topRoles: Array<{
    title: string;
    description: string;
    emoji: string;
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
}

const CareerAnalysis = () => {
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState('');
  const [goal, setGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [userProfile, setUserProfile] = useState<{degree: string, skills: string, goal: string} | null>(null);
  const { toast } = useToast();

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
    setUserProfile(null);
    
    try {
      console.log('Analyzing profile:', { degree: degree.trim(), skills: skills.trim(), goal: goal.trim() });

      const { data, error } = await supabase.functions.invoke('analysis', {
        body: {
          degree: degree.trim(),
          skills: skills.trim() || undefined,
          goal: goal.trim() || undefined
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Analysis response:', data);

      if (data.success) {
        setAnalysisResult(data.analysis);
        setUserProfile(data.userProfile);
        toast({
          title: "✅ Analysis Complete",
          description: `Personalized career analysis generated for ${degree.trim()}`,
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
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

  const handleReAnalyze = () => {
    setDegree('');
    setSkills('');
    setGoal('');
    setAnalysisResult(null);
    setUserProfile(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="border-b border-amber-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-autumn-500">🎯 Career Analysis</h1>
              <p className="text-navy-600 dark:text-navy-300">Powered by Zane AI</p>
            </div>
          </div>
          {/* Theme toggle button here */}
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Input Form */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-autumn-500 flex items-center gap-2">
              📝 Tell Us About Yourself
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Degree <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., B.Pharm, PharmD, M.Pharm in Pharmacology"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border-amber-200 focus:border-autumn-500"
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
                className="border-amber-200 focus:border-autumn-500 min-h-[80px]"
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
                className="border-amber-200 focus:border-autumn-500"
              />
            </div>
            
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-autumn-500 to-navy-600 hover:from-autumn-600 hover:to-navy-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  🔍 Analyzing Your Career Path...
                </>
              ) : (
                '🔍 Analyze Career Path'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* User Profile Display */}
        {userProfile && (
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Analysis Based On:</span>
              </div>
              <div className="text-sm text-blue-700">
                <strong>Degree:</strong> {userProfile.degree} | 
                <strong> Skills:</strong> {userProfile.skills || 'Not specified'} | 
                <strong> Goal:</strong> {userProfile.goal || 'Open to opportunities'}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6 animate-fade-in">
            {/* Career Match Cards - NEW UX */}
            <CareerMatchCards
              roles={analysisResult.topRoles.map((role, i) => ({
                ...role,
                matchScore: 80 - i * 10 + Math.floor(Math.random() * 7), // Demo scores (randomish ~80/70/60)
              }))}
              summary="Based on your skills and profile, here’s where you shine the most."
            />
            {/* 
            -- Old detailed display is still available but hidden for now --
            <Card> ... </Card>
            */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAnalysis;
