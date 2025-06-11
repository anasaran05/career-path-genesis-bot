
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Building, MapPin, Clock, User, FileText, Star, Briefcase, TrendingUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/job-scan" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Job Search</span>
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
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-3">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-white/70 mb-4">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {job.postedDate}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 px-3 py-1">
                      {job.type}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-3 py-1">
                      {job.experience}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-3 py-1">
                      {job.salary}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Progress value={job.match} className="w-32 h-3" />
                    <span className="text-lg font-medium text-blue-400">{job.match}% Profile Match</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3 lg:ml-8 mt-6 lg:mt-0">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                    onClick={() => navigate(`/job-application/${job.id}`, { state: { job } })}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-8"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Save Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                    <p className="text-white/80 leading-relaxed">{job.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {job.responsibilities?.map((resp, idx) => (
                        <li key={idx} className="text-white/80 flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Required Qualifications</h3>
                    <ul className="space-y-2">
                      {job.requirements?.map((req, idx) => (
                        <li key={idx} className="text-white/80 flex items-start">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">What We Offer</h3>
                    <ul className="space-y-2">
                      <li className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Competitive salary package ({job.salary})
                      </li>
                      <li className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Comprehensive health insurance coverage
                      </li>
                      <li className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Professional development opportunities
                      </li>
                      <li className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Flexible working arrangements
                      </li>
                      <li className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        Annual performance bonuses
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building className="w-5 h-5 mr-2 text-blue-400" />
                    About {job.company}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-white/60 text-sm">Industry:</span>
                      <p className="text-white">Healthcare & Pharmaceuticals</p>
                    </div>
                    <div>
                      <span className="text-white/60 text-sm">Company Size:</span>
                      <p className="text-white">1000+ employees</p>
                    </div>
                    <div>
                      <span className="text-white/60 text-sm">Founded:</span>
                      <p className="text-white">1985</p>
                    </div>
                    <div>
                      <span className="text-white/60 text-sm">Headquarters:</span>
                      <p className="text-white">{job.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Match */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    Skills Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm">Clinical Knowledge</span>
                        <span className="text-green-400 text-sm">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm">Pharmaceutical Experience</span>
                        <span className="text-green-400 text-sm">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm">Patient Care</span>
                        <span className="text-green-400 text-sm">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm">Documentation Skills</span>
                        <span className="text-yellow-400 text-sm">70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                    Similar Positions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="text-white font-medium">Hospital Pharmacist</h4>
                      <p className="text-white/70 text-sm">Manipal Hospitals • Bangalore</p>
                      <span className="text-blue-400 text-sm">88% match</span>
                    </div>
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="text-white font-medium">Pharmacy Manager</h4>
                      <p className="text-white/70 text-sm">Max Healthcare • Delhi</p>
                      <span className="text-blue-400 text-sm">82% match</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Clinical Research Associate</h4>
                      <p className="text-white/70 text-sm">IQVIA • Mumbai</p>
                      <span className="text-blue-400 text-sm">79% match</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
