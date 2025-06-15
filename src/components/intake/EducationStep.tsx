
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { StepProps } from "@/types/intake";

export const EducationStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-8 animate-fade-in">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-navy-800 mb-2">Education Background</h2>
      <p className="text-slate-600">🎓 Tell me about your academic journey in pharmacy</p>
    </div>
    
    <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-navy-400">
      <h3 className="text-lg font-semibold text-navy-700 mb-4">Undergraduate Degree (Optional)</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Degree</Label>
          <Select value={formData.ugDegree} onValueChange={(value) => updateFormData('ugDegree', value)}>
            <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-lg">
              <SelectItem value="bpharm">B.PHARM</SelectItem>
              <SelectItem value="dpharm">D.PHARM</SelectItem>
              <SelectItem value="bsc-nursing">B.SC NURSING</SelectItem>
              <SelectItem value="gnm">GNM (NURSING)</SelectItem>
              <SelectItem value="bpt">BPT (PHYSIOTHERAPY)</SelectItem>
              <SelectItem value="bmlt">BMLT (MEDICAL LAB TECHNOLOGY)</SelectItem>
              <SelectItem value="boptom">B.OPTOM (OPTOMETRY)</SelectItem>
              <SelectItem value="btech">B.TECH</SelectItem>
              <SelectItem value="be">B.E.</SelectItem>
              <SelectItem value="bsc">B.SC</SelectItem>
              <SelectItem value="bcom">B.COM</SelectItem>
              <SelectItem value="ba">B.A.</SelectItem>
              <SelectItem value="bba">BBA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Specialization</Label>
          <Input 
            value={formData.ugSpecialization}
            onChange={(e) => updateFormData('ugSpecialization', e.target.value)}
            className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
            placeholder="e.g., Clinical Pharmacy"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Year of Completion</Label>
          <Select value={formData.ugYear} onValueChange={(value) => updateFormData('ugYear', value)}>
            <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-lg">
              {Array.from({length: 36}, (_, i) => 2025 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <div className="bg-autumn-50 rounded-xl p-6 border-l-4 border-autumn-500">
      <h3 className="text-lg font-semibold text-navy-700 mb-4">Postgraduate Degree</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Degree</Label>
          <Select value={formData.pgDegree} onValueChange={(value) => updateFormData('pgDegree', value)}>
            <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-lg">
              <SelectItem value="pharm-d">PHARM.D</SelectItem>
              <SelectItem value="mpharm">M.PHARM</SelectItem>
              <SelectItem value="msc-nursing">M.SC NURSING</SelectItem>
              <SelectItem value="mpt">MPT (PHYSIOTHERAPY)</SelectItem>
              <SelectItem value="mtech">M.TECH</SelectItem>
              <SelectItem value="me">M.E.</SelectItem>
              <SelectItem value="msc">M.SC</SelectItem>
              <SelectItem value="mcom">M.COM</SelectItem>
              <SelectItem value="ma">M.A.</SelectItem>
              <SelectItem value="mba">MBA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Specialization</Label>
          <Input 
            value={formData.pgSpecialization}
            onChange={(e) => updateFormData('pgSpecialization', e.target.value)}
            className="bg-white border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 rounded-lg"
            placeholder="e.g., Clinical Research, Pharmacology"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-navy-700 font-medium">Year of Completion</Label>
          <Select value={formData.pgYear} onValueChange={(value) => updateFormData('pgYear', value)}>
            <SelectTrigger className="bg-white border-slate-200 text-navy-800 focus:border-navy-400 rounded-lg">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-lg">
              {Array.from({length: 36}, (_, i) => 2025 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
);
