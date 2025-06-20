import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Target, Book, Sparkle, TrendingUp, Award, Users, Lightbulb } from "lucide-react";

interface AnalysisData {
  summary: string;
  top_roles: string[];
  learning_path: string[];
  additional_tips: string[];
  skills_assessment?: {
    technical: number;
    soft: number;
    domain: number;
  };
  market_insights?: {
    demand: string;
    salary_range: string;
    growth_potential: string;
  };
}

interface CareerAnalysisCardsProps {
  analysis?: AnalysisData;
}

const sectionFont = "font-sans";

const CareerAnalysisCards: React.FC<CareerAnalysisCardsProps> = ({ analysis }) => {
  // Default data if no analysis provided
  const defaultAnalysis: AnalysisData = {
    summary: "You're a Pharm.D graduate aiming for a career in clinical research.",
    top_roles: [
      "Clinical Research Associate",
      "Regulatory Affairs Specialist", 
      "Medical Writer",
    ],
    learning_path: [
      "Step 1: Learn GCP and Clinical Trial Phases",
      "Step 2: Get certified in pharmacovigilance tools", 
      "Step 3: Apply to CRO internships",
    ],
    additional_tips: [
      "Improve LinkedIn visibility",
      "Join relevant job groups"
    ],
    skills_assessment: {
      technical: 75,
      soft: 85,
      domain: 80
    },
    market_insights: {
      demand: "High demand in pharmaceutical industry",
      salary_range: "₹6-12 LPA for entry level",
      growth_potential: "Excellent growth opportunities"
    }
  };

  const data = analysis || defaultAnalysis;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#fcf7f3] via-[#f9f7fc] to-[#edf2fa] py-10 px-4 flex flex-col items-center ${sectionFont}`}>
      <div className="max-w-4xl w-full mx-auto space-y-8">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Sparkle className="w-4 h-4 mr-2" />
            Career Analysis Complete
          </div>
          <h1 className="text-4xl font-bold text-navy-800 mb-4">Your Personalized Career Insights</h1>
          <p className="text-xl text-slate-600">AI-powered analysis tailored to your pharmaceutical background</p>
        </div>

        {/* SUMMARY */}
        <Card className="bg-[#faf7f3] border-none shadow-xl rounded-2xl transition hover:shadow-2xl animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
            <span className="bg-navy-100 text-navy-600 p-3 rounded-xl">
              <Search className="w-6 h-6" />
            </span>
            <CardTitle className="text-xl font-bold tracking-wide text-navy-700">
              Career Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-slate-700 text-lg leading-relaxed">{data.summary}</p>
          </CardContent>
        </Card>

        {/* Skills Assessment */}
        {data.skills_assessment && (
          <Card className="bg-[#f0f4f8] border-none shadow-xl rounded-2xl transition hover:shadow-2xl animate-fade-in">
            <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
              <span className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </span>
              <CardTitle className="text-xl font-bold tracking-wide text-blue-700">
                Skills Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-navy-700 font-medium">Technical Skills</span>
                    <span className="text-navy-600 font-bold">{data.skills_assessment.technical}%</span>
                  </div>
                  <Progress value={data.skills_assessment.technical} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-navy-700 font-medium">Soft Skills</span>
                    <span className="text-navy-600 font-bold">{data.skills_assessment.soft}%</span>
                  </div>
                  <Progress value={data.skills_assessment.soft} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-navy-700 font-medium">Domain Knowledge</span>
                    <span className="text-navy-600 font-bold">{data.skills_assessment.domain}%</span>
                  </div>
                  <Progress value={data.skills_assessment.domain} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TOP ROLES */}
        <Card className="bg-[#eef1f8] border-none shadow-xl rounded-2xl transition hover:shadow-2xl animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
            <span className="bg-autumn-100 text-autumn-600 p-3 rounded-xl">
              <Target className="w-6 h-6" />
            </span>
            <CardTitle className="text-xl font-bold tracking-wide text-autumn-700">
              Top Career Roles
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              {data.top_roles.map((role, i) => (
                <div key={role} className="flex items-center gap-4 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-autumn-500 to-autumn-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-navy-700 font-semibold text-lg">{role}</span>
                  </div>
                  <div className="text-green-500 font-bold">
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LEARNING PATH */}
        <Card className="bg-[#fffaf3] border-none shadow-xl rounded-2xl transition hover:shadow-2xl animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
            <span className="bg-blue-50 text-blue-500 p-3 rounded-xl">
              <Book className="w-6 h-6" />
            </span>
            <CardTitle className="text-xl font-bold tracking-wide text-blue-700">
              Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {data.learning_path.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-900 font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        {data.market_insights && (
          <Card className="bg-[#f8fffe] border-none shadow-xl rounded-2xl transition hover:shadow-2xl animate-fade-in">
            <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
              <span className="bg-green-100 text-green-600 p-3 rounded-xl">
                <Award className="w-6 h-6" />
              </span>
              <CardTitle className="text-xl font-bold tracking-wide text-green-700">
                Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800 mb-1">Market Demand</h4>
                  <p className="text-green-700 text-sm">{data.market_insights.demand}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-800 mb-1">Salary Range</h4>
                  <p className="text-blue-700 text-sm">{data.market_insights.salary_range}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Sparkle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-800 mb-1">Growth Potential</h4>
                  <p className="text-purple-700 text-sm">{data.market_insights.growth_potential}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TIPS */}
        <Card className="bg-[#faf8fc] border-none shadow-xl rounded-2xl transition hover:shadow-2xl animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
            <span className="bg-purple-100 text-purple-500 p-3 rounded-xl">
              <Lightbulb className="w-6 h-6" />
            </span>
            <CardTitle className="text-xl font-bold tracking-wide text-purple-700">
              Personalized Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {data.additional_tips.map((tip, i) => (
                <div key={tip} className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-xl">
                  <span className="text-yellow-500 text-xl">💡</span>
                  <span className="text-purple-900 font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerAnalysisCards;