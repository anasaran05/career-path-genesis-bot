
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TestAnalysisDemo() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Button
        onClick={() => navigate("/demo-test")}
        size="lg"
        className="bg-gradient-to-r from-autumn-500 to-navy-700 text-white px-10 py-4 rounded-xl font-semibold text-xl shadow-lg hover:from-autumn-600 hover:to-navy-800 hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2"
      >
        <Sparkles className="w-6 h-6 mr-2 text-yellow-300 animate-pulse" />
        Explore the Career Path Demo
      </Button>
      <span className="mt-4 text-sm text-slate-500 text-center max-w-xs">
        Try out Zane AI's interactive demo. No sign up needed!
      </span>
    </div>
  );
}
