import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, Copy, CheckCircle } from "lucide-react";
interface ManualApplicationModalProps {
  open: boolean;
  onClose: () => void;
  job?: any;
}
const ManualApplicationModal: React.FC<ManualApplicationModalProps> = ({
  open,
  onClose,
  job
}) => {
  const [resumeCopied, setResumeCopied] = useState(false);
  const [coverLetterCopied, setCoverLetterCopied] = useState(false);
  const sampleResume = `JOHN DOE
Healthcare Professional | Clinical Research Specialist
📧 john.doe@email.com | 📱 (555) 123-4567 | 🔗 linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Dedicated healthcare professional with 3+ years of experience in clinical research and patient care. 
Proven track record in data collection, patient recruitment, and regulatory compliance.

EDUCATION
• Doctor of Pharmacy (Pharm.D) - University of Healthcare, 2021
• Bachelor of Science in Biology - State University, 2019

EXPERIENCE
Clinical Research Associate | MedTech Solutions (2022-Present)
• Conducted 15+ clinical trials with 95% compliance rate
• Managed patient recruitment strategies increasing enrollment by 40%
• Collaborated with cross-functional teams to ensure protocol adherence

SKILLS
• Clinical Trial Management  • GCP Certification  • Data Analysis
• Patient Care  • Regulatory Affairs  • Medical Writing`;
  const sampleCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${job?.title || 'Clinical Research'} position at ${job?.company || 'your organization'}. 

With my Pharm.D background and 3+ years of clinical research experience, I am excited to contribute to your team's mission of advancing healthcare through innovative research.

My experience includes:
• Managing clinical trials with excellent compliance rates
• Developing patient recruitment strategies that exceed targets
• Collaborating with regulatory bodies to ensure protocol adherence

I am particularly drawn to this role because it aligns perfectly with my passion for clinical research and my goal to make a meaningful impact in healthcare.

Thank you for considering my application. I look forward to discussing how my skills and enthusiasm can contribute to your team's success.

Best regards,
John Doe`;
  const handleCopyResume = () => {
    navigator.clipboard.writeText(sampleResume);
    setResumeCopied(true);
    setTimeout(() => setResumeCopied(false), 2000);
  };
  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(sampleCoverLetter);
    setCoverLetterCopied(true);
    setTimeout(() => setCoverLetterCopied(false), 2000);
  };
  const handleDownloadResume = () => {
    const blob = new Blob([sampleResume], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resume_${job?.title?.replace(/\s+/g, '_') || 'Job'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleDownloadCoverLetter = () => {
    const blob = new Blob([sampleCoverLetter], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CoverLetter_${job?.title?.replace(/\s+/g, '_') || 'Job'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-gradient-to-br from-slate-900 via- whitespace-normal to-slate-900 border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Manual Application Package</DialogTitle>
          {job && <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                <p className="text-white/70">{job.company} • {job.location}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">{job.type}</Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">{job.salary}</Badge>
              </div>
            </div>}
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Section */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Generated Resume</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopyResume} className="border-white/30 text-white bg-zinc-950 hover:bg-zinc-800">
                    {resumeCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" onClick={handleDownloadResume} className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-black/20 rounded p-4 text-sm text-white/90 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                {sampleResume}
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter Section */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Cover Letter</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopyCoverLetter} className="border-white/30 text-white bg-zinc-950 hover:bg-zinc-800">
                    {coverLetterCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" onClick={handleDownloadCoverLetter} className="bg-purple-600 hover:bg-purple-700">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-black/20 rounded p-4 text-sm text-white/90 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                {sampleCoverLetter}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Link Section */}
        {job && <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30 mt-6">
            <CardContent className="p-6 rounded-sm py-[25px] px-[62px] bg-slate-900">
              <h3 className="text-lg font-semibold text-white mb-4">Apply to This Job</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 mb-2">Ready to submit your application?</p>
                  <p className="text-sm text-white/60">Click below to open the job posting and apply manually</p>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" onClick={() => window.open(job.link || '#', '_blank')}>
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>}

        <div className="text-center text-sm text-white/60 mt-4">
          <p>💡 Tip: Copy the resume and cover letter, then paste them into the job application form</p>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ManualApplicationModal;