
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Brain, Sparkles } from "lucide-react";

const TestAnalysisDemo: React.FC = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyse = async () => {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch(
        "https://rtbbeulmvojlvvfgfgpb.supabase.co/functions/v1/smart-processor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            degree: "Pharm.D",
            skills: "Pharmacovigilance, Research, ICH-GCP",
            goal: "Get into a top MNC clinical research role"
          })
        }
      );
      const data = await response.json();
      setResult(data.result);
      console.log("📦 Gemini Response:", data);
    } catch (error) {
      setResult("Something went wrong. Try again.");
      console.error("❌ Error fetching analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white border-slate-200 shadow-lg mb-10 max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-navy-800">
          <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
          Demo: Test AI Career Analysis
        </CardTitle>
        <CardDescription>
          Try the smart processor analysis with sample pharmacy data (for demo only)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={handleAnalyse}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Run Test Analysis
              </>
            )}
          </Button>
          {result && (
            <div className="bg-slate-50 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-slate-800 mb-2">Test Result:</h4>
              <div className="whitespace-pre-wrap text-slate-700 text-sm">{result}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestAnalysisDemo;

