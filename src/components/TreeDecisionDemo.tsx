import React, { useState } from "react";
import { Brain, ChevronRight, ChevronDown, LucideIcon, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Define the tree structure
type TreeNode = {
  id: string;
  label: string;
  icon?: LucideIcon;
  options?: { label: string; next: string; }[];
  suggestion?: string; // Career suggestion if this is a leaf node
};

const treeData: Record<string, TreeNode> = {
  root: {
    id: "root",
    label: "What excites you most?",
    icon: Brain,
    options: [
      { label: "Solving Healthcare Challenges", next: "research" },
      { label: "Ensuring Drug Safety", next: "pharmacovigilance" },
      { label: "Managing Regulations", next: "regulatory" },
    ],
  },
  research: {
    id: "research",
    label: "Research Interests",
    icon: Circle,
    options: [
      { label: "Clinical Trials", next: "clinical-trials" },
      { label: "Data Analysis", next: "data-analysis" },
    ],
  },
  pharmacovigilance: {
    id: "pharmacovigilance",
    label: "Drug Safety Focus?",
    icon: Circle,
    options: [
      { label: "Risk Assessment", next: "risk-assessment" },
      { label: "Medical Writing", next: "medical-writing" },
    ],
  },
  regulatory: {
    id: "regulatory",
    label: "Which aspect appeals?",
    icon: Circle,
    options: [
      { label: "Policy Development", next: "policy" },
      { label: "Compliance", next: "compliance" },
    ],
  },

  // Leaves with suggestions
  "clinical-trials": {
    id: "clinical-trials",
    label: "Your recommended career path:",
    suggestion: "Clinical Research Associate / Clinical Project Manager at Top MNCs",
  },
  "data-analysis": {
    id: "data-analysis",
    label: "Your recommended career path:",
    suggestion: "Medical Data Analyst / AI Healthcare Scientist",
  },
  "risk-assessment": {
    id: "risk-assessment",
    label: "Your recommended career path:",
    suggestion: "Pharmacovigilance Risk Specialist",
  },
  "medical-writing": {
    id: "medical-writing",
    label: "Your recommended career path:",
    suggestion: "Medical Writer / Drug Safety Documentation Expert",
  },
  "policy": {
    id: "policy",
    label: "Your recommended career path:",
    suggestion: "Regulatory Affairs Policy Lead",
  },
  "compliance": {
    id: "compliance",
    label: "Your recommended career path:",
    suggestion: "Regulatory Compliance Manager (Pharma/Biotech)",
  },
};

function TreeNodeDisplay({
  node,
  onSelect,
}: {
  node: TreeNode;
  onSelect: (next: string) => void;
}) {
  // Show options if not a leaf node
  if (node.options) {
    return (
      <div className="flex flex-col gap-8 items-center w-full animate-fade-in">
        <div className="flex flex-col gap-2 items-center">
          {node.icon && <node.icon className="w-12 h-12 text-autumn-500 mb-1 animate-pulse" />}
          <span className="font-bold text-2xl text-navy-700 text-center">{node.label}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {node.options.map((opt) => (
            <Button
              key={opt.label}
              onClick={() => onSelect(opt.next)}
              className="bg-gradient-to-r from-autumn-500 to-navy-700 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 hover:from-autumn-600 hover:to-navy-800 hover:shadow-lg transition-all duration-300"
            >
              <ChevronRight className="mr-2" /> {opt.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }
  // Leaf suggestion node
  return (
    <div className="flex flex-col gap-7 items-center animate-fade-in">
      <div className="flex items-center gap-2">
        <Brain className="w-12 h-12 text-autumn-500 animate-pulse" />
        <span className="font-bold text-2xl text-navy-900">{node.label}</span>
      </div>
      <div className="w-full max-w-md bg-gradient-to-br from-navy-800 to-autumn-100 p-6 rounded-2xl flex flex-col items-center shadow-2xl border border-navy-200 animate-scale-in">
        <span className="text-xl sm:text-2xl font-semibold text-white text-center mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
          {node.suggestion}
        </span>
        <Button
          className="mt-5 bg-gradient-to-r from-autumn-500 to-navy-700 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 hover:from-autumn-600 hover:to-navy-800 hover:shadow-lg transition-all duration-300"
          onClick={() => window.location.href = "/auth"}
        >
          Discover Your Personalized Career Path!
        </Button>
      </div>
    </div>
  );
}

export const TreeDecisionDemo = () => {
  const [path, setPath] = useState<string[]>(["root"]); // keeps ID of current path

  const currentNode = treeData[path[path.length - 1]];

  // Show percent progress based on how far down tree (max 2 levels to reach suggestion)
  const maxSteps = 3;
  const progressValue =
    Math.min(100, ((path.length - 1) / (maxSteps)) * 100);

  const handleSelect = (next: string) => {
    setPath([...path, next]);
  };

  // Allow user to go back if not at root
  const handleBack = () => {
    if (path.length > 1) setPath(path.slice(0, -1));
  };

  return (
    <div className="flex flex-col w-full items-center gap-6">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl pt-7 pb-2 px-2">
        <Progress value={progressValue} className="h-2 bg-navy-100" />
        <div className="text-right text-xs text-slate-500 pr-1">{Math.round(progressValue)}% completed</div>
      </div>
      {/* Card */}
      <div className="bg-white bg-opacity-90 rounded-3xl max-w-2xl w-full shadow-2xl px-8 py-12 sm:px-10 flex flex-col gap-7 animate-fade-in">
        <TreeNodeDisplay node={currentNode} onSelect={handleSelect} />
      </div>
      {path.length > 1 && !currentNode.suggestion && (
        <Button
          onClick={handleBack}
          variant="outline"
          className="border border-navy-200 text-navy-700 px-6 py-3 rounded-xl mt-2 hover:bg-navy-100 transition-colors"
        >
          <ChevronDown className="mr-2" /> Go Back
        </Button>
      )}
    </div>
  );
};

export default TreeDecisionDemo;
