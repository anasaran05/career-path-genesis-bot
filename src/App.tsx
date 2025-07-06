
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Intake from "./pages/Intake";
import Analysis from "./pages/Analysis";
import CareerAnalysis from "./pages/CareerAnalysis";
import AdvisoryReport from "./pages/AdvisoryReport";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobScan from "./pages/JobScan";
import JobDetails from "./pages/JobDetails";
import JobApplication from "./pages/JobApplication";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/career-analysis" element={<CareerAnalysis />} />
            <Route path="/advisory-report" element={<AdvisoryReport />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="/job-scan" element={<JobScan />} />
            <Route path="/job-details/:id" element={<JobDetails />} />
            <Route path="/job-application" element={<JobApplication />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
