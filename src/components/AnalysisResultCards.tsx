import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Target, Book, Repeat2, Wrench, MessageSquare, Microscope } from "lucide-react";

type Props = {
  topRoles?: { title: string; icon?: React.ReactNode; description?: string }[];
  roadmap?: string[];
  courses?: string[];
  skillGaps?: { icon: React.ReactNode; gap: string }[];
  onReanalyze?: () => void;
};

const skillIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "technical":
      return <Wrench className="inline w-4 h-4 mr-1 text-navy-600" />;
    case "communication":
    case "soft":
      return <MessageSquare className="inline w-4 h-4 mr-1 text-autumn-500" />;
    case "scientific":
    case "research":
      return <Microscope className="inline w-4 h-4 mr-1 text-blue-600" />;
    default:
      return <Wrench className="inline w-4 h-4 mr-1 text-navy-600" />;
  }
};

export const AnalysisResultCards: React.FC<Props> = ({
  topRoles,
  roadmap,
  courses,
  skillGaps,
  // onReanalyze, // No longer used
}) => {
  // Helper for icons
  const jobRoleIcon = (title: string) => {
    if (title.toLowerCase().includes("pharmacovigilance"))
      return <Microscope className="inline w-6 h-6 text-autumn-500" />;
    if (title.toLowerCase().includes("regulatory"))
      return <Book className="inline w-6 h-6 text-blue-600" />;
    if (title.toLowerCase().includes("pharmacy"))
      return <Target className="inline w-6 h-6 text-green-500" />;
    if (title.toLowerCase().includes("medical writer"))
      return <Book className="inline w-6 h-6 text-purple-500" />;
    return <Target className="inline w-6 h-6 text-navy-600" />;
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto py-6 animate-fade-in">
      {/* === TOP ROLES === */}
      {topRoles && topRoles.length > 0 && (
        <Card className="bg-[#fbf7f3] rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.015] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎓</span>
            <h2 className="text-lg font-semibold text-autumn-500">Top 3 Job Roles</h2>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            {topRoles.map((role, idx) => (
              <div
                key={role.title}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white/70 rounded-lg px-4 py-3 group transition-all hover:shadow-lg hover:bg-navy-50/40"
              >
                <div className="flex-shrink-0">{role.icon || jobRoleIcon(role.title)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-700 text-base">{role.title}</span>
                  </div>
                  {role.description && (
                    <p className="text-slate-600 text-sm">{role.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* === ROADMAP === */}
      {roadmap && roadmap.length > 0 && (
        <Card className="bg-[#f6f3ea] rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📚</span>
            <h2 className="text-lg font-semibold text-autumn-500">Personalized Roadmap</h2>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-navy-800 mt-2">
            {roadmap.map((step, idx) => (
              <li key={idx} className="text-sm flex items-center gap-2">
                <span>{["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"][idx] || "➡️"}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* === COURSES === */}
      {courses && courses.length > 0 && (
        <Card className="bg-[#f8f8fa] rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🚀</span>
            <h2 className="text-lg font-semibold text-autumn-500">Suggested Courses &amp; Certifications</h2>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {courses.map((course, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="border-blue-300 bg-blue-50 text-blue-900 font-medium text-xs rounded-full px-3 py-1 capitalize hover:scale-105 transition-all"
              >
                {course}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* === SKILL GAPS === */}
      {skillGaps && skillGaps.length > 0 && (
        <Card className="bg-[#f9fafc] rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🧠</span>
            <h2 className="text-lg font-semibold text-autumn-500">Skill Gaps to Improve</h2>
          </div>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {skillGaps.map((s, idx) => (
              <li className="flex items-center text-navy-700 text-sm gap-2" key={idx}>
                {s.icon || skillIcon(s.gap)}
                <span>{s.gap}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* === RE-ANALYZE BUTTON === */}
      {/*
      <div className="flex justify-end">
        <Button
          onClick={onReanalyze}
          className="bg-autumn-500 hover:bg-autumn-600 text-white font-bold rounded-lg shadow-md text-sm px-6 py-2 flex gap-2 items-center transition-transform hover:scale-105"
        >
          <Repeat2 className="w-4 h-4" />
          Re-analyze
        </Button>
      </div>
      */}
    </div>
  );
};
