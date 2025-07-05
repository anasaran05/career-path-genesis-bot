import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Intake from "./pages/Intake";
import Analysis from "./pages/Analysis";
import CareerAnalysis from "./pages/CareerAnalysis";
import JobScan from "./pages/JobScan";
import JobApplication from "./pages/JobApplication";
import JobDetails from "./pages/JobDetails";
import AdvisoryReport from "./pages/AdvisoryReport";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import UpdateProfile from "./pages/UpdateProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/career-analysis" element={<CareerAnalysis />} />
          <Route path="/job-scan" element={<JobScan />} />
          <Route path="/job-application/:jobId" element={<JobApplication />} />
          <Route path="/job-details/:jobId" element={<JobDetails />} />
          <Route path="/advisory-report" element={<AdvisoryReport />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;