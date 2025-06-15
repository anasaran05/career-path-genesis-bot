
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { StepProps } from "@/types/intake";

export const CareerGoalsStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Target className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-navy-800 mb-2">Career Goals & Preferences</h2>
      <p className="text-slate-600">🎯 Help me understand your pharmaceutical career aspirations</p>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Preferred Industry *</Label>
        <Select value={formData.preferredIndustry} onValueChange={(value) => updateFormData('preferredIndustry', value)}>
          <SelectTrigger className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 focus:bg-white rounded-lg">
            <SelectValue placeholder="Select your preferred pharmaceutical industry" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 rounded-lg">
            <SelectItem value="clinical-pharmacy">🏥 Clinical Pharmacy & Hospitals</SelectItem>
            <SelectItem value="pharma-industry">🧪 Pharmaceutical Industry</SelectItem>
            <SelectItem value="clinical-research">🔬 Clinical Research & CROs</SelectItem>
            <SelectItem value="regulatory">📋 Regulatory Affairs</SelectItem>
            <SelectItem value="pharma-tech">💻 Pharmaceutical Technology</SelectItem>
            <SelectItem value="academic">🎓 Academia & Teaching</SelectItem>
            <SelectItem value="medical-writing">📝 Medical Writing</SelectItem>
            <SelectItem value="consulting">💼 Pharmaceutical Consulting</SelectItem>
            <SelectItem value="international">🌍 International Opportunities</SelectItem>
            <SelectItem value="entrepreneurship">🚀 Pharmaceutical Entrepreneurship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Career Goals & Aspirations *</Label>
        <Textarea 
          value={formData.careerGoals}
          onChange={(e) => updateFormData('careerGoals', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="Describe your pharmaceutical career goals, dream job, or what you want to achieve in the next 2-5 years in the pharmacy field..."
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Preferred Job Locations</Label>
          <Textarea 
            value={formData.jobLocations}
            onChange={(e) => updateFormData('jobLocations', e.target.value)}
            className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
            placeholder="e.g., Bangalore, Mumbai, Remote, Hyderabad, International..."
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Expected Salary Range</Label>
          <Select value={formData.salaryExpectation} onValueChange={(value) => updateFormData('salaryExpectation', value)}>
            <SelectTrigger className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 focus:bg-white rounded-lg">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-lg">
              <SelectItem value="3-5">₹3-5 LPA</SelectItem>
              <SelectItem value="5-8">₹5-8 LPA</SelectItem>
              <SelectItem value="8-12">₹8-12 LPA</SelectItem>
              <SelectItem value="12-18">₹12-18 LPA</SelectItem>
              <SelectItem value="18+">₹18+ LPA</SelectItem>
              <SelectItem value="international">International Opportunities</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Work Style Preference</Label>
        <Select value={formData.workStyle} onValueChange={(value) => updateFormData('workStyle', value)}>
          <SelectTrigger className="bg-slate-50 border-slate-200 text-navy-800 focus:border-navy-400 focus:bg-white rounded-lg">
            <SelectValue placeholder="Select work style" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 rounded-lg">
            <SelectItem value="clinical-onsite">🏥 Clinical/Hospital - On-site</SelectItem>
            <SelectItem value="hybrid">🏢 Hybrid (2-3 days office)</SelectItem>
            <SelectItem value="remote">💻 Fully Remote</SelectItem>
            <SelectItem value="flexible">⚡ Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);
