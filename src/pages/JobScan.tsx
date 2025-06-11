
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search, MapPin, Building, Clock, Briefcase, FileText, User, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const JobScan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('Scanning job boards...');
  
  const studentData = location.state?.studentData || {};
  const careerPath = location.state?.careerPath || 'Healthcare';

  const scanPhases = [
    'Scanning job boards...',
    'Filtering relevant positions...',
    'Analyzing skill requirements...',
    'Matching with your profile...',
    'Generating recommendations...'
  ];

  useEffect(() => {
    let phase = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 3;
        if (newProgress >= 100) {
          setIsScanning(false);
          clearInterval(interval);
          return 100;
        }
        
        if (newProgress > (phase + 1) * 20) {
          phase++;
          if (phase < scanPhases.length) {
            setCurrentPhase(scanPhases[phase]);
          }
        }
        
        return newProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const jobListings = [
    {
      id: 1,
      title: "Clinical Pharmacist",
      company: "Apollo Hospitals",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "2-4 years",
      salary: "8-12 LPA",
      postedDate: "2 days ago",
      match: 95,
      description: "Join our clinical pharmacy team to provide pharmaceutical care and medication management for patients. Work closely with healthcare professionals to optimize therapy outcomes.",
      requirements: [
        "B.Pharm or PharmD degree",
        "Clinical pharmacy experience",
        "Knowledge of drug interactions",
        "Patient counseling skills",
        "Hospital pharmacy experience preferred"
      ],
      responsibilities: [
        "Review medication orders for appropriateness",
        "Provide drug information to healthcare team",
        "Conduct medication reconciliation",
        "Counsel patients on medication use",
        "Participate in clinical rounds"
      ]
    },
    {
      id: 2,
      title: "Regulatory Affairs Associate",
      company: "Dr. Reddy's Laboratories",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      experience: "1-3 years",
      salary: "6-10 LPA",
      match: 88,
      description: "Support regulatory submissions and ensure compliance with pharmaceutical regulations. Work on drug registration and regulatory documentation.",
      requirements: [
        "B.Pharm/M.Pharm degree",
        "Knowledge of regulatory guidelines",
        "Documentation skills",
        "Attention to detail",
        "Good communication skills"
      ],
      responsibilities: [
        "Prepare regulatory submissions",
        "Review product labeling",
        "Monitor regulatory changes",
        "Coordinate with regulatory agencies",
        "Maintain regulatory databases"
      ]
    },
    {
      id: 3,
      title: "Medical Affairs Executive",
      company: "Novartis India",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "3-5 years",
      salary: "12-18 LPA",
      match: 82,
      description: "Support medical and scientific activities for pharmaceutical products. Engage with healthcare professionals and provide medical expertise.",
      requirements: [
        "PharmD or M.Pharm degree",
        "Medical writing experience",
        "Scientific presentation skills",
        "Clinical research knowledge",
        "Strong analytical skills"
      ],
      responsibilities: [
        "Develop medical content",
        "Support clinical trials",
        "Engage with KOLs",
        "Review promotional materials",
        "Provide medical training"
      ]
    },
    {
      id: 4,
      title: "Drug Safety Associate",
      company: "Cognizant Healthcare",
      location: "Chennai, Tamil Nadu",
      type: "Full-time",
      experience: "0-2 years",
      salary: "4-7 LPA",
      match: 75,
      description: "Monitor and assess drug safety data, process adverse event reports, and ensure pharmacovigilance compliance.",
      requirements: [
        "Life Sciences degree",
        "Pharmacovigilance knowledge",
        "Data analysis skills",
        "Medical coding certification preferred",
        "Good English communication"
      ],
      responsibilities: [
        "Process adverse event reports",
        "Perform medical coding",
        "Review safety data",
        "Prepare safety reports",
        "Maintain safety databases"
      ]
    },
    {
      id: 5,
      title: "Clinical Research Associate",
      company: "Quintiles India",
      location: "Pune, Maharashtra",
      type: "Full-time",
      experience: "1-3 years",
      salary: "5-9 LPA",
      match: 78,
      description: "Monitor clinical trials and ensure compliance with Good Clinical Practice guidelines. Work with investigator sites and manage study protocols.",
      requirements: [
        "Life Sciences degree",
        "GCP certification",
        "Clinical research experience",
        "Travel flexibility",
        "Protocol knowledge"
      ],
      responsibilities: [
        "Monitor clinical trial sites",
        "Review case report forms",
        "Ensure GCP compliance",
        "Train site personnel",
        "Manage study timelines"
      ]
    }
  ];

  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Loader2 className="w-16 h-16 text-blue-400 mx-auto animate-spin mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Scanning Job Market</h2>
              <p className="text-white/70">Finding the best opportunities that match your profile</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white">{currentPhase}</span>
                <span className="text-white/70">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/analysis" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Analysis</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-bold text-xl">ZaneProEd Career Agent</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Results Summary */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">
              <Search className="w-4 h-4 mr-2" />
              Job Scan Complete
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Found {jobListings.length} Matching Opportunities
            </h1>
            <p className="text-xl text-white/70">
              Based on your {careerPath} background and preferences
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">{jobListings.length}</div>
                <div className="text-white/70">Total Jobs Found</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-white/70">Best Match Score</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
                <div className="text-white/70">Companies</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">12</div>
                <div className="text-white/70">Avg LPA Range</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
            Available Positions
          </h2>
          
          <div className="space-y-6">
            {jobListings.map((job) => (
              <Card key={job.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/70 mb-2">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.postedDate}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                              {job.type}
                            </Badge>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                              {job.experience}
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {job.salary}
                            </Badge>
                            <div className="flex items-center">
                              <Progress value={job.match} className="w-16 h-2 mr-2" />
                              <span className="text-sm text-blue-400">{job.match}% match</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-4">{job.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Key Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, idx) => (
                              <li key={idx} className="text-white/70 text-sm flex items-center">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Responsibilities:</h4>
                          <ul className="space-y-1">
                            {job.responsibilities.slice(0, 3).map((resp, idx) => (
                              <li key={idx} className="text-white/70 text-sm flex items-center">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 lg:ml-6 lg:w-48">
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => navigate(`/job-application/${job.id}`, { state: { job, studentData } })}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                        onClick={() => navigate(`/job-details/${job.id}`, { state: { job } })}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobScan;
