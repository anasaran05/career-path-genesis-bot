import { useState, useCallback } from 'react';
import { FormData } from '@/types/intake';
import { CareerAnalysisEngine, CareerAnalysisResult } from '@/utils/careerAnalysisEngine';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useCareerAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CareerAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const analyzeProfile = useCallback(async (profileData: FormData) => {
    if (!user) {
      setError('User must be logged in to perform analysis');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Use local analysis engine
      const localResult = CareerAnalysisEngine.analyzeProfile(profileData);
      
      // Try to enhance with AI analysis
      try {
        const { data: aiData, error: aiError } = await supabase.functions.invoke('analysis', {
          body: {
            degree: `${profileData.ugDegree} ${profileData.pgDegree}`.trim(),
            skills: `${profileData.technicalSkills} ${profileData.softSkills}`.trim(),
            goal: profileData.careerGoals
          }
        });

        if (!aiError && aiData?.success) {
          // Merge AI insights with local analysis
          const enhancedResult = {
            ...localResult,
            summary: aiData.analysis.summary || localResult.summary,
            topRoles: aiData.analysis.topRoles?.map((role: any, index: number) => ({
              ...role,
              matchScore: localResult.topRoles[index]?.matchScore || 85 - index * 5,
              requirements: localResult.topRoles[index]?.requirements || [],
              salaryRange: localResult.topRoles[index]?.salaryRange || '₹6-12 LPA',
              growthPotential: localResult.topRoles[index]?.growthPotential || 'Good'
            })) || localResult.topRoles
          };
          
          setAnalysisResult(enhancedResult);
        } else {
          // Fall back to local analysis
          setAnalysisResult(localResult);
        }
      } catch (aiError) {
        console.warn('AI analysis failed, using local analysis:', aiError);
        setAnalysisResult(localResult);
      }

      // Save to database
      await saveAnalysisToDatabase(profileData, localResult);

      toast({
        title: "Analysis Complete",
        description: "Your personalized career analysis is ready!",
      });

    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to analyze profile. Please try again.');
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [user, toast]);

  const saveAnalysisToDatabase = async (profileData: FormData, result: CareerAnalysisResult) => {
    try {
      const { error } = await supabase.from('career_analysis').insert([{
        user_id: user?.id,
        degree: `${profileData.ugDegree} ${profileData.pgDegree}`.trim(),
        skills: `${profileData.technicalSkills} ${profileData.softSkills}`.trim(),
        goals: profileData.careerGoals,
        analysis_result: JSON.stringify(result)
      }]);

      if (error) {
        console.error('Error saving analysis to database:', error);
      }
    } catch (error) {
      console.error('Database save error:', error);
    }
  };

  const clearAnalysis = useCallback(() => {
    setAnalysisResult(null);
    setError(null);
  }, []);

  return {
    isAnalyzing,
    analysisResult,
    error,
    analyzeProfile,
    clearAnalysis
  };
};