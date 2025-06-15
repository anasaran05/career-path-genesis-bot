
import React, { useState } from "react";
import DemoTestAnalysisModal from "./DemoTestAnalysisModal";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function TestAnalysisDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="bg-gradient-to-r from-autumn-500 to-navy-700 text-white px-10 py-4 rounded-xl font-semibold text-xl shadow-lg hover:from-autumn-600 hover:to-navy-800 hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2"
      >
        <Sparkles className="w-6 h-6 mr-2 text-yellow-300 animate-pulse" />
        Run Test Analysis (Demo)
      </Button>
      <DemoTestAnalysisModal open={open} onOpenChange={setOpen} />
      <span className="mt-4 text-sm text-slate-500 text-center max-w-xs">
        Try out Zane AI's interactive demo. No sign up needed!
      </span>
    </div>
  );
}
