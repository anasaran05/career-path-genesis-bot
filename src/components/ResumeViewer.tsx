
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, Calendar, Building, GraduationCap, Star, Award, Users, TrendingUp } from "lucide-react";

interface ResumeData {
  id: number;
  candidateName: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  degree: string;
  university: string;
  graduationYear: string;
  experience: string;
  skills: string[];
  rating: number;
  workExperience: Array<{
    company: string;
    role: string;
    duration: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    grade: string;
  }>;
  certifications: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: number;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ isOpen, onClose, applicationId }) => {
  // Mock resume data based on application ID
  const getResumeData = (id: number): ResumeData => {
    const resumes: Record<number, ResumeData> = {
      1: {
        id: 1,
        candidateName: "Dr. Priya Sharma",
        position: "Senior Clinical Research Associate",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        degree: "Pharm.D",
        university: "NIPER, Mohali",
        graduationYear: "2020",
        experience: "4 years",
        skills: ["GCP", "Protocol Development", "Data Analysis", "Regulatory Compliance", "CDISC", "Statistical Analysis"],
        rating: 4.8,
        workExperience: [
          {
            company: "Cipla Limited",
            role: "Clinical Research Associate II",
            duration: "Jan 2022 - Present",
            achievements: [
              "Led clinical trials for 3 novel pharmaceutical compounds",
              "Achieved 98% data accuracy across all studies",
              "Reduced study timeline by 15% through process optimization",
              "Mentored 5 junior CRAs on GCP compliance"
            ]
          },
          {
            company: "Dr. Reddy's Laboratories",
            role: "Clinical Research Associate I",
            duration: "Jun 2020 - Dec 2021",
            achievements: [
              "Managed Phase II and Phase III clinical trials",
              "Conducted site monitoring visits for 8 investigator sites",
              "Maintained 100% regulatory compliance record",
              "Contributed to successful NDA submission for 2 products"
            ]
          }
        ],
        education: [
          {
            degree: "Doctor of Pharmacy (Pharm.D)",
            institution: "National Institute of Pharmaceutical Education and Research (NIPER), Mohali",
            year: "2020",
            grade: "CGPA: 8.7/10"
          },
          {
            degree: "Bachelor of Pharmacy (B.Pharm)",
            institution: "Jamia Hamdard University, New Delhi",
            year: "2016",
            grade: "First Class with Distinction (78%)"
          }
        ],
        certifications: [
          "Good Clinical Practice (GCP) Certification - NIDA",
          "Clinical Data Management Certification - ACRP",
          "Pharmacovigilance Certification - DIA",
          "ICH Guidelines Certification"
        ],
        projects: [
          {
            name: "Bioequivalence Study of Novel Antidiabetic Compound",
            description: "Led a Phase I bioequivalence study comparing novel formulation with reference product in healthy volunteers",
            technologies: ["SAS", "R", "CDISC SDTM", "ADaM"]
          },
          {
            name: "Real-World Evidence Study for Cardiovascular Drug",
            description: "Conducted post-marketing surveillance study analyzing safety and efficacy data from electronic health records",
            technologies: ["SQL", "Python", "Tableau", "REDCap"]
          }
        ]
      },
      2: {
        id: 2,
        candidateName: "Rahul Patel",
        position: "Senior Clinical Research Associate",
        email: "rahul.patel@email.com",
        phone: "+91 98765 43211",
        location: "Delhi NCR",
        degree: "M.Pharm",
        university: "Jamia Hamdard",
        graduationYear: "2021",
        experience: "3.5 years",
        skills: ["Clinical Trials", "Regulatory Compliance", "CDISC", "Data Management", "Site Monitoring", "Protocol Design"],
        rating: 4.5,
        workExperience: [
          {
            company: "Sun Pharmaceutical Industries",
            role: "Clinical Research Associate",
            duration: "Mar 2021 - Present",
            achievements: [
              "Successfully managed 12 clinical trials across multiple therapeutic areas",
              "Achieved 95% on-time study completion rate",
              "Implemented risk-based monitoring approach, reducing costs by 20%",
              "Led investigator meetings for Phase III oncology studies"
            ]
          },
          {
            company: "Biocon Limited",
            role: "Junior Clinical Research Associate",
            duration: "Aug 2020 - Feb 2021",
            achievements: [
              "Supported Phase II diabetes drug development program",
              "Conducted training sessions on electronic data capture systems",
              "Maintained detailed study documentation as per ICH-GCP guidelines"
            ]
          }
        ],
        education: [
          {
            degree: "Master of Pharmacy (M.Pharm) - Pharmacology",
            institution: "Jamia Hamdard University, New Delhi",
            year: "2021",
            grade: "CGPA: 8.4/10"
          },
          {
            degree: "Bachelor of Pharmacy (B.Pharm)",
            institution: "Delhi Pharmaceutical Sciences and Research University",
            year: "2019",
            grade: "First Class (75%)"
          }
        ],
        certifications: [
          "ACRP Clinical Research Coordinator Certification",
          "ICH-GCP Training Certification",
          "Clinical Trial Management Certification - ACRI"
        ],
        projects: [
          {
            name: "Comparative Effectiveness Research Study",
            description: "Analyzed real-world data to compare effectiveness of two diabetes treatments using claims database",
            technologies: ["R", "SAS", "SQL", "Power BI"]
          }
        ]
      },
      3: {
        id: 3,
        candidateName: "Dr. Anjali Verma",
        position: "Pharmaceutical Sales Manager",
        email: "anjali.verma@email.com",
        phone: "+91 98765 43212",
        location: "Gurgaon, Haryana",
        degree: "B.Pharm + MBA",
        university: "BITS Pilani",
        graduationYear: "2018",
        experience: "6 years",
        skills: ["Sales Strategy", "Key Account Management", "Market Analysis", "Team Leadership", "Business Development", "Pharmaceutical Marketing"],
        rating: 4.9,
        workExperience: [
          {
            company: "Abbott Healthcare",
            role: "Area Sales Manager",
            duration: "Apr 2022 - Present",
            achievements: [
              "Led a team of 15 medical representatives across North India",
              "Achieved 128% of annual sales target for FY 2023-24",
              "Launched 4 new pharmaceutical products successfully",
              "Increased market share by 25% in assigned territory",
              "Implemented digital marketing strategies resulting in 40% increase in brand awareness"
            ]
          },
          {
            company: "Lupin Pharmaceuticals",
            role: "Senior Medical Representative",
            duration: "Jun 2019 - Mar 2022",
            achievements: [
              "Consistently achieved 110%+ of quarterly sales targets",
              "Developed key relationships with 200+ healthcare professionals",
              "Conducted medical education programs for healthcare providers",
              "Won 'Outstanding Performer' award for 3 consecutive years"
            ]
          },
          {
            company: "Cadila Pharmaceuticals",
            role: "Medical Representative",
            duration: "Jul 2018 - May 2019",
            achievements: [
              "Exceeded first-year sales target by 115%",
              "Successfully penetrated new market segments",
              "Received 'Best Newcomer' award"
            ]
          }
        ],
        education: [
          {
            degree: "Master of Business Administration (MBA) - Marketing",
            institution: "Birla Institute of Technology and Science (BITS), Pilani",
            year: "2018",
            grade: "CGPA: 8.9/10"
          },
          {
            degree: "Bachelor of Pharmacy (B.Pharm)",
            institution: "Birla Institute of Technology and Science (BITS), Pilani",
            year: "2016",
            grade: "First Class with Distinction (82%)"
          }
        ],
        certifications: [
          "Certified Pharmaceutical Sales Professional (CPSP)",
          "Digital Marketing Certification - Google",
          "Leadership Excellence Program - IIM Ahmedabad",
          "Pharmaceutical Marketing Certification - AICTE"
        ],
        projects: [
          {
            name: "Digital Territory Expansion Strategy",
            description: "Developed and implemented comprehensive digital marketing strategy for rural market penetration",
            technologies: ["CRM Software", "Analytics Tools", "Social Media Platforms"]
          },
          {
            name: "Medical Education Initiative",
            description: "Created and executed medical education program for healthcare professionals on latest treatment protocols",
            technologies: ["Learning Management Systems", "Video Conferencing", "Assessment Tools"]
          }
        ]
      },
      4: {
        id: 4,
        candidateName: "Vikash Kumar",
        position: "Pharmacovigilance Specialist",
        email: "vikash.kumar@email.com",
        phone: "+91 98765 43213",
        location: "Bangalore, Karnataka",
        degree: "M.Pharm",
        university: "JSS University",
        graduationYear: "2022",
        experience: "2.5 years",
        skills: ["ADR Reporting", "Signal Detection", "MedDRA", "Pharmacovigilance", "Regulatory Compliance", "Case Processing"],
        rating: 4.2,
        workExperience: [
          {
            company: "Biocon Biologics",
            role: "Pharmacovigilance Associate",
            duration: "Sep 2022 - Present",
            achievements: [
              "Processed 500+ adverse event reports with 99% accuracy",
              "Contributed to 8 PSUR submissions to global regulatory authorities",
              "Identified 3 potential safety signals through data mining",
              "Maintained compliance with EudraVigilance and FDA FAERS reporting requirements"
            ]
          },
          {
            company: "Strides Pharma Science",
            role: "Junior Pharmacovigilance Associate",
            duration: "Jun 2021 - Aug 2022",
            achievements: [
              "Handled case intake and triage for global safety database",
              "Supported clinical trial safety reporting activities",
              "Conducted medical literature review for safety updates"
            ]
          }
        ],
        education: [
          {
            degree: "Master of Pharmacy (M.Pharm) - Pharmacology",
            institution: "JSS University, Mysore",
            year: "2022",
            grade: "CGPA: 8.1/10"
          },
          {
            degree: "Bachelor of Pharmacy (B.Pharm)",
            institution: "Karnataka College of Pharmacy, Bangalore",
            year: "2020",
            grade: "First Class (72%)"
          }
        ],
        certifications: [
          "Pharmacovigilance Certification - DIA India",
          "MedDRA Training Certification",
          "Good Pharmacovigilance Practices (GVP) Training"
        ],
        projects: [
          {
            name: "Automated Signal Detection System",
            description: "Developed automated algorithms for detecting potential safety signals from large datasets",
            technologies: ["Python", "R", "SQL", "Statistical Analysis"]
          }
        ]
      }
    };

    return resumes[id] || resumes[1]; // fallback to first resume if ID not found
  };

  const resumeData = getResumeData(applicationId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy-800">Resume - {resumeData.candidateName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Header Section */}
          <Card className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{resumeData.candidateName}</h1>
                  <p className="text-xl opacity-90 mb-4">{resumeData.position}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{resumeData.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{resumeData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{resumeData.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-xl font-bold">{resumeData.rating}</span>
                  </div>
                  <p className="text-sm opacity-80">{resumeData.experience} Experience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-800 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Core Skills & Expertise</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 bg-navy-100 text-navy-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-800 flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Professional Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="border-l-4 border-navy-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800">{exp.role}</h3>
                      <p className="text-navy-600 font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="outline" className="text-slate-600">
                      {exp.duration}
                    </Badge>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-navy-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  {index < resumeData.workExperience.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-800 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>Education</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-navy-800">{edu.degree}</h3>
                    <p className="text-navy-600">{edu.institution}</p>
                    <p className="text-slate-600 text-sm">{edu.grade}</p>
                  </div>
                  <Badge variant="outline" className="text-slate-600">
                    {edu.year}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-800 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Certifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
                    <Award className="w-4 h-4 text-navy-500" />
                    <span className="text-slate-700 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-800 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Key Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-navy-800 mb-2">{project.name}</h3>
                  <p className="text-slate-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;
