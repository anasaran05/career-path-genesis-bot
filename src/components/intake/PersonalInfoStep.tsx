
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { StepProps } from "@/types/intake";

export const PersonalInfoStep = ({ formData, updateFormData }: StepProps) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <User className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-navy-800 mb-2">Personal Information</h2>
      <p className="text-slate-600">👤 Let's start with your basic details</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-navy-700 font-medium">Full Name *</Label>
        <Input 
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-navy-700 font-medium">Email Address *</Label>
        <Input 
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="your.email@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-navy-700 font-medium">Phone Number</Label>
        <Input 
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="+91 9876543210"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location" className="text-navy-700 font-medium">Current Location *</Label>
        <Input 
          id="location"
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
          className="bg-slate-50 border-slate-200 text-navy-800 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white transition-all duration-300 rounded-lg"
          placeholder="City, State"
        />
      </div>
    </div>
  </div>
);
