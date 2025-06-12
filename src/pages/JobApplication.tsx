import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, User, Loader2, CheckCircle, Download, Send } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const JobApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Analyzing job requirements...');
  const job = location.state?.job || {};
  const studentData = location.state?.studentData || {};
  const generationSteps = ['Analyzing job requirements...', 'Matching your profile...', 'Generating custom resume...', 'Creating cover letter...', 'Optimizing for ATS systems...'];
  const handleGenerateDocuments = () => {
    setIsGenerating(true);
    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 4;
        if (newProgress >= 100) {
          setIsGenerating(false);
          setGenerationComplete(true);
          clearInterval(interval);
          return 100;
        }
        if (newProgress > (step + 1) * 20) {
          step++;
          if (step < generationSteps.length) {
            setCurrentStep(generationSteps[step]);
          }
        }
        return newProgress;
      });
    }, 150);
  };
  if (isGenerating) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center bg-gray-950">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Loader2 className="w-16 h-16 text-blue-400 mx-auto animate-spin mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Creating Your Application</h2>
              <p className="text-white/70">Generating tailored resume and cover letter for this position</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white">{currentStep}</span>
                <span className="text-white/70">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center bg-zinc-950">
          <Link to="/job-scan" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Job Search</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center rounded-md">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-bold text-xl">ZaneProEd Career Agent</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 bg-black">
        <div className="max-w-4xl mx-auto">
          {!generationComplete ? <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4 mr-2" />
                Job Application Setup
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">
                Apply for {job.title}
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Let's create a tailored resume and cover letter for this position
              </p>

              {/* Job Summary */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <p className="text-white/70">{job.company} • {job.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={job.match} className="w-20 h-2" />
                      <span className="text-blue-400 font-medium">{job.match}% match</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">{job.type}</Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">{job.experience}</Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">{job.salary}</Badge>
                  </div>
                  
                  <p className="text-white/80 text-left">{job.description}</p>
                </CardContent>
              </Card>

              {/* Application Process */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-white">What We'll Create for You</CardTitle>
                  <CardDescription className="text-white/70">
                    Our AI will generate a customized application package specifically for this role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Custom Resume</h4>
                          <p className="text-white/70 text-sm">Tailored to match job requirements</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Cover Letter</h4>
                          <p className="text-white/70 text-sm">Personalized for this specific role</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-left">
                        <h4 className="text-white font-semibold mb-2">Key Optimizations:</h4>
                        <ul className="text-white/70 text-sm space-y-1">
                          <li>• ATS-optimized formatting</li>
                          <li>• Keyword matching from job description</li>
                          <li>• Relevant skills highlighting</li>
                          <li>• Experience alignment</li>
                          <li>• Industry-specific language</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" onClick={handleGenerateDocuments} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-zinc-300 rounded-md font-light text-base px-[11px] py-[11px] mx-0 bg-[#d9e3e9]/[0.31]">
                Generate Application Documents
                <FileText className="w-5 h-5 ml-2" />
              </Button>
            </div> : <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4 mr-2" />
                Documents Generated Successfully
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">
                Your Application is Ready!
              </h1>
              <p className="text-xl text-white/70 mb-8">
                We've created a customized resume and cover letter for this position
              </p>

              {/* Generated Documents */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Custom Resume</h3>
                      <p className="text-white/70 text-sm">Tailored for {job.title}</p>
                    </div>
                    
                    <div className="space-y-2 text-left text-sm text-white/70 mb-4">
                      <div>• Highlighted relevant pharmaceutical experience</div>
                      <div>• Emphasized clinical skills and certifications</div>
                      <div>• Optimized for healthcare industry ATS</div>
                      <div>• Matched keywords from job description</div>
                    </div>
                    
                    <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-zinc-950">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <User className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Cover Letter</h3>
                      <p className="text-white/70 text-sm">Personalized for {job.company}</p>
                    </div>
                    
                    <div className="space-y-2 text-left text-sm text-white/70 mb-4">
                      <div>• Addressed to hiring manager</div>
                      <div>• Connected your background to role requirements</div>
                      <div>• Expressed enthusiasm for the position</div>
                      <div>• Professional pharmaceutical industry tone</div>
                    </div>
                    
                    <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-zinc-950">
                      <Download className="w-4 h-4 mr-2" />
                      Download Cover Letter
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Application Actions */}
              <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30 backdrop-blur-sm mb-8">
                <CardContent className="p-6 bg-zinc-950">
                  <h3 className="text-xl font-bold text-white mb-4">Ready to Apply?</h3>
                  <p className="text-white/80 mb-6">
                    Your documents are optimized and ready for submission. Choose how you'd like to proceed.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8">
                      <Send className="w-5 h-5 mr-2" />
                      Apply Now (Manual)
                    </Button>
                    
                    <Button variant="outline" size="lg" onClick={() => navigate('/auto-application', {
                  state: {
                    job,
                    studentData,
                    premium: true
                  }
                })} className="border-yellow-500/50 text-yellow-300 px-8 bg-inherit">
                      Auto-Apply (Premium)
                    </Button>
                  </div>
                  
                  <p className="text-white/60 text-sm mt-4">
                    Auto-Apply feature requires premium subscription for automated job applications
                  </p>
                </CardContent>
              </Card>
            </div>}
        </div>
      </div>
    </div>;
};
export default JobApplication;