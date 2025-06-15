
import React from "react";
import { TreeDecisionDemo } from "@/components/TreeDecisionDemo";

const DemoTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-autumn-50 flex flex-col items-center pb-12">
      <header className="w-full max-w-4xl mx-auto text-center pt-14 pb-9 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Zane AI Demo Career Path Explorer
        </h1>
        <p className="max-w-xl mx-auto text-lg text-slate-300 font-medium">
          Experience a playful, AI-inspired decision tree. Click through the branches and discover your recommended career path—no signup or login required!
        </p>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <TreeDecisionDemo />
      </main>
      <footer className="w-full text-center pt-10 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Zane AI. All Rights Reserved.
      </footer>
    </div>
  );
};

export default DemoTest;
