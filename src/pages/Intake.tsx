import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, User, BookOpen, Award, Target, Brain, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FormData } from "@/types/intake";
import { PersonalInfoStep } from "@/components/intake/PersonalInfoStep";
import { EducationStep } from "@/components/intake/EducationStep";
import { SkillsExperienceStep } from "@/components/intake/SkillsExperienceStep";
import { CareerGoalsStep } from "@/components/intake/CareerGoalsStep";

const Intake = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    
    // Education Background
    ugDegree: '',
    ugSpecialization: '',
    ugYear: '',
    pgDegree: '',
    pgSpecialization: '',
    pgYear: '',
    
    // Skills & Experience
    technicalSkills: '',
    softSkills: '',
    internships: '',
    projects: '',
    certifications: '',
    
    // Career Goals
    preferredIndustry: '',
    careerGoals: '',
    jobLocations: '',
    salaryExpectation: '',
    workStyle: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleAnalyseClick = async (profileData: FormData) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Analysis Complete",
        description: "Your career analysis is ready!",
      });
      
      // Navigate to analysis page with results
      navigate('/analysis', { 
        state: { 
          studentData: profileData,
          analysisResult: { analysis: "Mock analysis completed successfully!" }
        } 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleAnalyseClick(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <EducationStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <SkillsExperienceStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <CareerGoalsStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
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
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Career Intelligence Intake
            </div>
            <h1 className="text-3xl font-bold text-navy-800 mb-2">Tell Zane AI About Yourself</h1>
            <p className="text-slate-600">Help me understand your profile to build the perfect career path</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-8 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-navy-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-slate-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-slate-100" />
          </div>

          <div className="flex justify-between mt-8 px-4">
            {[
              { step: 1, icon: User, label: "Personal Info", emoji: "👤" },
              { step: 2, icon: BookOpen, label: "Education", emoji: "🎓" },
              { step: 3, icon: Award, label: "Skills & Experience", emoji: "💡" },
              { step: 4, icon: Target, label: "Career Goals", emoji: "🎯" }
            ].map((item) => (
              <div key={item.step} className={`flex flex-col items-center transition-all duration-300 ${currentStep >= item.step ? 'text-navy-600' : 'text-slate-400'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep >= item.step ? 'bg-gradient-to-r from-navy-500 to-autumn-500 shadow-lg scale-110' : 'bg-slate-100'
                }`}>
                  {currentStep >= item.step ? (
                    <item.icon className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-lg">{item.emoji}</span>
                  )}
                </div>
                <span className="text-xs text-center hidden sm:block font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-white border border-slate-200 shadow-xl rounded-xl animate-scale-in">
            <CardContent className="p-8">
              {renderStep()}
              
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isAnalyzing}
                  className="border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-700 px-6 py-2 rounded-xl transition-all duration-300"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Profile...
                    </>
                  ) : currentStep === totalSteps ? (
                    <>
                      Analyze My Profile 
                      <Brain className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 pb-8">
          <div className="flex items-center justify-center space-x-3 text-slate-400">
            <div className="w-6 h-6 bg-gradient-to-r from-navy-400 to-autumn-400 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Powered by ZaneProEd</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intake;