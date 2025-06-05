
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowDown, User, BookOpen, Award, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Intake = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
    technicalSkills: [],
    softSkills: [],
    internships: '',
    projects: '',
    certifications: '',
    
    // Career Goals
    preferredIndustry: '',
    careerGoals: '',
    jobLocations: [],
    salaryExpectation: '',
    workStyle: ''
  });

  const navigate = useNavigate();
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to analysis page with form data
      navigate('/analysis', { state: { studentData: formData } });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-bold text-xl">ZANE AI</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Student Background Intake</h1>
            <p className="text-white/70">Help us understand your profile to build the perfect career path</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-white/70">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-6">
            {[
              { step: 1, icon: User, label: "Personal Info" },
              { step: 2, icon: BookOpen, label: "Education" },
              { step: 3, icon: Award, label: "Skills & Experience" },
              { step: 4, icon: Target, label: "Career Goals" }
            ].map((item) => (
              <div key={item.step} className={`flex flex-col items-center ${currentStep >= item.step ? 'text-blue-400' : 'text-white/40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= item.step ? 'bg-blue-500' : 'bg-white/10'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center hidden sm:block">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {currentStep === totalSteps ? 'Analyze Profile' : 'Next Step'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Step Components
const PersonalInfoStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <User className="w-12 h-12 text-blue-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
      <p className="text-white/70">Let's start with your basic details</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="fullName" className="text-white">Full Name *</Label>
        <Input 
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-white">Email Address *</Label>
        <Input 
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-white">Phone Number</Label>
        <Input 
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="+91 9876543210"
        />
      </div>
      <div>
        <Label htmlFor="location" className="text-white">Current Location *</Label>
        <Input 
          id="location"
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="City, State"
        />
      </div>
    </div>
  </div>
);

const EducationStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Education Background</h2>
      <p className="text-white/70">Tell us about your academic journey</p>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Undergraduate Degree</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label className="text-white">Degree *</Label>
          <Select value={formData.ugDegree} onValueChange={(value) => updateFormData('ugDegree', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btech">B.Tech</SelectItem>
              <SelectItem value="be">B.E.</SelectItem>
              <SelectItem value="bsc">B.Sc</SelectItem>
              <SelectItem value="bcom">B.Com</SelectItem>
              <SelectItem value="ba">B.A.</SelectItem>
              <SelectItem value="bba">BBA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white">Specialization</Label>
          <Input 
            value={formData.ugSpecialization}
            onChange={(e) => updateFormData('ugSpecialization', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            placeholder="e.g., Computer Science"
          />
        </div>
        <div>
          <Label className="text-white">Year of Completion</Label>
          <Select value={formData.ugYear} onValueChange={(value) => updateFormData('ugYear', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({length: 10}, (_, i) => 2024 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Postgraduate Degree (Optional)</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label className="text-white">Degree</Label>
          <Select value={formData.pgDegree} onValueChange={(value) => updateFormData('pgDegree', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mtech">M.Tech</SelectItem>
              <SelectItem value="me">M.E.</SelectItem>
              <SelectItem value="msc">M.Sc</SelectItem>
              <SelectItem value="mcom">M.Com</SelectItem>
              <SelectItem value="ma">M.A.</SelectItem>
              <SelectItem value="mba">MBA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white">Specialization</Label>
          <Input 
            value={formData.pgSpecialization}
            onChange={(e) => updateFormData('pgSpecialization', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            placeholder="e.g., Data Science"
          />
        </div>
        <div>
          <Label className="text-white">Year of Completion</Label>
          <Select value={formData.pgYear} onValueChange={(value) => updateFormData('pgYear', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({length: 10}, (_, i) => 2024 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
);

const SkillsExperienceStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Skills & Experience</h2>
      <p className="text-white/70">Share your skills, projects, and experiences</p>
    </div>
    
    <div>
      <Label className="text-white">Technical Skills *</Label>
      <Textarea 
        value={formData.technicalSkills}
        onChange={(e) => updateFormData('technicalSkills', e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="e.g., Python, JavaScript, React, SQL, Machine Learning, Data Analysis..."
        rows={3}
      />
    </div>

    <div>
      <Label className="text-white">Soft Skills</Label>
      <Textarea 
        value={formData.softSkills}
        onChange={(e) => updateFormData('softSkills', e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="e.g., Leadership, Communication, Problem-solving, Team collaboration..."
        rows={2}
      />
    </div>

    <div>
      <Label className="text-white">Internships & Work Experience</Label>
      <Textarea 
        value={formData.internships}
        onChange={(e) => updateFormData('internships', e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="Describe your internships, part-time jobs, or work experience..."
        rows={3}
      />
    </div>

    <div>
      <Label className="text-white">Projects</Label>
      <Textarea 
        value={formData.projects}
        onChange={(e) => updateFormData('projects', e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="Describe your key projects, technologies used, and outcomes..."
        rows={3}
      />
    </div>

    <div>
      <Label className="text-white">Certifications</Label>
      <Textarea 
        value={formData.certifications}
        onChange={(e) => updateFormData('certifications', e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="List any relevant certifications, courses, or online learning..."
        rows={2}
      />
    </div>
  </div>
);

const CareerGoalsStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Career Goals & Preferences</h2>
      <p className="text-white/70">Help us understand your career aspirations</p>
    </div>
    
    <div>
      <Label className="text-white">Preferred Industry *</Label>
      <Select value={formData.preferredIndustry} onValueChange={(value) => updateFormData('preferredIndustry', value)}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technology">Technology & Software</SelectItem>
          <SelectItem value="healthcare">Healthcare & Pharmaceuticals</SelectItem>
          <SelectItem value="finance">Finance & Banking</SelectItem>
          <SelectItem value="consulting">Consulting</SelectItem>
          <SelectItem value="manufacturing">Manufacturing</SelectItem>
          <SelectItem value="retail">Retail & E-commerce</SelectItem>
          <SelectItem value="education">Education</SelectItem>
          <SelectItem value="government">Government & Public Sector</SelectItem>
          <SelectItem value="startup">Startups</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label className="text-white">Career Goals & Aspirations *</Label>
      <Textarea 
        value={formData.careerGoals}
        onChange={(e) => updateFormData('careerGoals', e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="Describe your career goals, dream job, or what you want to achieve in the next 2-5 years..."
        rows={4}
      />
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white">Preferred Job Locations</Label>
        <Textarea 
          value={formData.jobLocations}
          onChange={(e) => updateFormData('jobLocations', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="e.g., Bangalore, Mumbai, Remote, Hyderabad..."
          rows={2}
        />
      </div>
      <div>
        <Label className="text-white">Expected Salary Range</Label>
        <Select value={formData.salaryExpectation} onValueChange={(value) => updateFormData('salaryExpectation', value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-5">3-5 LPA</SelectItem>
            <SelectItem value="5-8">5-8 LPA</SelectItem>
            <SelectItem value="8-12">8-12 LPA</SelectItem>
            <SelectItem value="12-18">12-18 LPA</SelectItem>
            <SelectItem value="18+">18+ LPA</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div>
      <Label className="text-white">Work Style Preference</Label>
      <Select value={formData.workStyle} onValueChange={(value) => updateFormData('workStyle', value)}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select work style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="remote">Fully Remote</SelectItem>
          <SelectItem value="hybrid">Hybrid (2-3 days office)</SelectItem>
          <SelectItem value="office">Office-based</SelectItem>
          <SelectItem value="flexible">Flexible</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default Intake;
