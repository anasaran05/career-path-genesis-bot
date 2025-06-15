
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Target, Book, Bulb } from "lucide-react";

// Dummy data for preview
const analysis = {
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
};

const sectionFont = "font-sans"; // prefers Inter or Helvetica, fallback to sans

const CareerAnalysisCards = () => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#fcf7f3] via-[#f9f7fc] to-[#edf2fa] py-10 px-4 flex flex-col items-center ${sectionFont}`}>
      <div className="max-w-3xl w-full mx-auto space-y-8">

        {/* SUMMARY */}
        <Card className="bg-[#faf7f3] border-none shadow-xl rounded-2xl transition hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-2">
            <span className="bg-navy-100 text-navy-600 p-2 rounded-lg">
              <Search className="w-6 h-6" />
            </span>
            <CardTitle className="text-lg font-bold tracking-wide text-navy-700">
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-base leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>

        {/* TOP ROLES */}
        <Card className="bg-[#eef1f8] border-none shadow-xl rounded-2xl transition hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-2">
            <span className="bg-autumn-100 text-autumn-600 p-2 rounded-lg">
              <Target className="w-6 h-6" />
            </span>
            <CardTitle className="text-lg font-bold tracking-wide text-autumn-700">
              Top Career Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="pl-2 space-y-2">
              {analysis.top_roles.map((role, i) => (
                <li key={role} className="flex items-center gap-2 text-navy-700 text-base">
                  <span className="text-green-500">✔️</span>
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* LEARNING PATH */}
        <Card className="bg-[#fffaf3] border-none shadow-xl rounded-2xl transition hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-2">
            <span className="bg-blue-50 text-blue-500 p-2 rounded-lg">
              <Book className="w-6 h-6" />
            </span>
            <CardTitle className="text-lg font-bold tracking-wide text-blue-700">
              Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {analysis.learning_path.map((step, idx) => (
                <li key={idx} className="text-blue-900 text-base">{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* TIPS */}
        <Card className="bg-[#faf8fc] border-none shadow-xl rounded-2xl transition hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-2">
            <span className="bg-purple-100 text-purple-500 p-2 rounded-lg">
              <Bulb className="w-6 h-6" />
            </span>
            <CardTitle className="text-lg font-bold tracking-wide text-purple-700">
              Personalized Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="pl-2 space-y-2">
              {analysis.additional_tips.map((tip, i) => (
                <li key={tip} className="flex items-center gap-2 text-purple-900 text-base">
                  <span className="text-yellow-400">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerAnalysisCards;
