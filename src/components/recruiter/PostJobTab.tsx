
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PostJobTab = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl animate-fade-in">
        <CardHeader>
          <CardTitle className="text-navy-800 text-2xl">Post a New Job</CardTitle>
          <CardDescription>Fill in the details to post your job opening</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-navy-700 font-medium">Job Title</label>
              <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., Software Engineer" />
            </div>
            <div className="space-y-2">
              <label className="text-navy-700 font-medium">Location</label>
              <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., Mumbai, Maharashtra" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-navy-700 font-medium">Job Description</label>
            <Textarea 
              className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" 
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-navy-700 font-medium">Experience Level</label>
              <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., 2-4 years" />
            </div>
            <div className="space-y-2">
              <label className="text-navy-700 font-medium">Salary Range</label>
              <Input className="bg-slate-50 border-slate-200 rounded-xl transition-all duration-300 focus:scale-105" placeholder="e.g., ₹6-10 LPA" />
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-navy-600 to-autumn-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
            Post Job Opening
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJobTab;
