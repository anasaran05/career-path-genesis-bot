
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, Target, BookOpen, Wrench, MessageSquare, Microscope, RefreshCw, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-autumn-500">🎯 Career Analysis</h1>
              <p className="text-navy-600">Powered by Zane AI</p>
            </div>
          </div>
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
            {/* Top 3 Job Roles */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-autumn-500 flex items-center gap-2">
                  🎯 Top 3 Job Role Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-1">
                  {analysisResult.topRoles.map((role, index) => (
                    <div key={index} className="bg-white/70 rounded-lg p-4 hover:bg-white/90 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{role.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-navy-700">{role.title}</h3>
                          <p className="text-sm text-navy-600">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Roadmap */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-autumn-500 flex items-center gap-2">
                  🛣️ Personalized Learning Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.roadmap.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/70 rounded-lg p-3">
                      <span className="text-xl">{step.emoji}</span>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-green-700">Step {index + 1}</span>
                        <p className="text-navy-700">{step.step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills to Develop */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-autumn-500 flex items-center gap-2">
                  🧠 Skills to Develop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.skillsTodev.map((skill, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/70 rounded-lg p-3">
                      {getSkillIcon(skill.category)}
                      <div>
                        <h4 className="font-medium text-navy-700">{skill.skill}</h4>
                        <p className="text-sm text-navy-600">{skill.description}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Courses */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-autumn-500 flex items-center gap-2">
                  📚 Suggested Courses & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {analysisResult.courses.map((course, index) => (
                    <Badge
                      key={index}
                      className={`px-3 py-2 text-sm font-medium rounded-full border transition-transform hover:scale-105 ${getPriorityColor(course.priority)}`}
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {course.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Re-analyze Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleReAnalyze}
                variant="outline"
                className="border-autumn-300 text-autumn-600 hover:bg-autumn-50 px-6 py-2 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                🔁 Re-Analyze
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAnalysis;
