import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10">
      <div className="container mx-auto px-4 py-6">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy-800">Student Dashboard</h1>
          </div>
          <Button onClick={() => navigate("/intake")} className="mt-4 md:mt-0 bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl shadow hover:from-navy-700 hover:to-autumn-600">
            Complete Intake
          </Button>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/70 shadow-md hover:shadow-xl transition hover:scale-[1.02] rounded-xl">
            <CardHeader>
              <Sparkles className="w-7 h-7 text-autumn-500 mb-2" />
              <CardTitle>Welcome, Student!</CardTitle>
              <CardDescription>Let's start your career transformation journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-medium text-slate-500 mb-2">Your next steps:</div>
              <ol className="list-decimal list-inside text-slate-700 mb-4">
                <li>Complete your intake form</li>
                <li>Run career analysis</li>
                <li>Apply for recommended jobs</li>
              </ol>
              <Button size="sm" className="bg-autumn-500 text-white hover:bg-autumn-600 rounded-xl" onClick={() => navigate("/analysis")}>
                Go to Career Analysis
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/70 shadow-md hover:shadow-xl transition rounded-xl">
            <CardHeader>
              <Target className="w-7 h-7 text-green-500 mb-2" />
              <CardTitle>Career Progress</CardTitle>
              <CardDescription>Track how far you've come!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-slate-200 rounded-full h-3 mb-2 overflow-hidden">
                <div className="bg-gradient-to-r from-navy-500 to-autumn-500 h-3 rounded-full transition-all" style={{ width: "55%" }} />
              </div>
              <div className="text-sm text-slate-600 mb-4">55% completed</div>
              <Button variant="outline" className="rounded-xl" onClick={() => navigate("/update-profile")}>
                Update Profile
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/70 shadow-md hover:shadow-xl transition rounded-xl">
            <CardHeader>
              <Brain className="w-7 h-7 text-blue-600 mb-2" />
              <CardTitle>Your Action Items</CardTitle>
              <CardDescription>Quick links to start upskilling</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-slate-700 mb-4">
                <li>Review skill gaps</li>
                <li>Enroll in a recommended course</li>
                <li>Download your career roadmap</li>
              </ul>
              <Button size="sm" variant="secondary" className="rounded-xl" onClick={() => navigate("/career-analysis")}>
                View Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;