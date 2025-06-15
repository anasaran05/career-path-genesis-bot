
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Award } from "lucide-react";
import { StepProps } from "@/types/intake";

export const SkillsExperienceStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Award className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-navy-800 mb-2">Skills & Experience</h2>
      <p className="text-slate-600">💡 Share your pharmaceutical skills, projects, and experiences</p>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Technical Skills (Optional)</Label>
        <Textarea 
          value={formData.technicalSkills}
          onChange={(e) => updateFormData('technicalSkills', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="e.g., Clinical data analysis, Pharmaceutical software, Laboratory techniques, Patient care protocols, Drug information systems..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Soft Skills (Optional)</Label>
        <Textarea 
          value={formData.softSkills}
          onChange={(e) => updateFormData('softSkills', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="e.g., Patient communication, Team collaboration, Problem-solving, Attention to detail, Leadership..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Internships & Work Experience (Optional)</Label>
        <Textarea 
          value={formData.internships}
          onChange={(e) => updateFormData('internships', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="Describe your pharmacy internships, hospital rotations, clinical experience, or part-time pharmaceutical work..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Projects (Optional)</Label>
        <Textarea 
          value={formData.projects}
          onChange={(e) => updateFormData('projects', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="Describe your pharmaceutical research projects, case studies, drug analysis, or clinical projects..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-navy-700 font-medium">Certifications (Optional)</Label>
        <Textarea 
          value={formData.certifications}
          onChange={(e) => updateFormData('certifications', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="List any pharmaceutical certifications, GCP training, drug safety courses, or specialized learning..."
          rows={2}
        />
      </div>
    </div>
  </div>
);
