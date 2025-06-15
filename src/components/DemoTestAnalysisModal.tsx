
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Activity, Question } from "lucide-react";

type QuestionType = {
  id: number;
  question: string;
  options: string[];
  icon?: React.ReactNode;
};

const demoQuestions: QuestionType[] = [
  {
    id: 1,
    question: "Which skill excites you most?",
    options: ["Pharmacovigilance", "Research", "Clinical Trials"],
    icon: <Question className="text-autumn-500 w-6 h-6" />,
  },
  {
    id: 2,
    question: "Preferred work environment?",
    options: ["Corporate", "Hospital", "Startup"],
    icon: <Question className="text-autumn-500 w-6 h-6" />,
  },
  {
    id: 3,
    question: "Your biggest career goal?",
    options: ["Top MNC", "Leadership Role", "Innovation"],
    icon: <Question className="text-autumn-500 w-6 h-6" />,
  },
  {
    id: 4,
    question: "Which soft skill defines you best?",
    options: ["Teamwork", "Resilience", "Communication"],
    icon: <Question className="text-autumn-500 w-6 h-6" />,
  }
];

const chartColors = ["#C75B56", "#0f172a", "#94a3b8"]; // Autumn 500, Navy 700, Navy 400

const demoResultsMap = [
  {
    category: "Clinical Research",
    value: 80,
    description: "Excellent fit for clinical research, ideal for MNC roles."
  },
  {
    category: "Pharmacovigilance",
    value: 65,
    description: "Strong potential in drug safety and monitoring careers."
  },
  {
    category: "Regulatory Affairs",
    value: 45,
    description: "Great fit for compliance-driven roles in pharma."
  }
];

export default function DemoTestAnalysisModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState(0); // 0 = intro, 1..n = question, n+1 = loading, n+2 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Progress calculation
  const questionsLength = demoQuestions.length;
  const isIntro = step === 0;
  const isLastQuestion = step === questionsLength;
  const isLoadingStep = step === questionsLength + 1;
  const isResultStep = step === questionsLength + 2;
  const progress = Math.min(100, (step / (questionsLength + 2)) * 100);

  // Handlers
  const handleStart = () => setStep(1);

  const handleAnswer = (answerIdx: number) => {
    setAnswers((prev) => [...prev, answerIdx]);
    setTimeout(() => setStep((s) => s + 1), 250); // for smooth transition
  };

  const handleShowResult = () => {
    setStep((s) => s + 1); // Enter loading step
    setTimeout(() => {
      setShowResult(true);
      setStep((s) => s + 1); // Move to results step
    }, 1700); // duration of AI "processing" animation
  };

  const handleSkipDemo = () => {
    onOpenChange(false);
  };

  const handleClose = () => {
    setAnswers([]);
    setShowResult(false);
    setStep(0);
    onOpenChange(false);
  };

  // Slightly randomize demo results based on answers to make it "feel" interactive
  const demoGraphData = demoResultsMap.map((r, i) => ({
    ...r,
    value: r.value + ((answers[i % answers.length] || 0) * 5)
  }));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg rounded-2xl bg-gradient-to-br from-navy-900 to-autumn-50 shadow-2xl px-0 overflow-hidden w-full animate-fade-in"
        style={{ minHeight: 390 }}
      >
        <div className="relative w-full pt-6 pb-1 px-2">
          {/* Progress Bar */}
          <Progress value={progress} className="h-2 mb-5 bg-navy-100" />
          <DialogClose
            asChild
            className="absolute right-2 top-2 !ring-0 !border-0"
          >
            <button
              className="text-slate-400 hover:text-navy-700 transition-colors"
              aria-label="Close"
            >✕</button>
          </DialogClose>
        </div>
        {/* Steps */}
        <div className="p-5 pt-0 flex flex-col min-h-[300px] justify-between">
          {/* INTRO */}
          {isIntro && (
            <div className="flex flex-col items-center gap-6 w-full text-center animate-fade-in">
              <div className="bg-autumn-100 bg-opacity-70 rounded-2xl shadow px-6 py-6 flex flex-col items-center gap-3">
                <Activity className="w-12 h-12 text-autumn-500 animate-pulse" />
                <h2 className="text-2xl font-bold text-navy-800 mb-1">
                  Welcome to Zane AI's Demo Test
                </h2>
                <p className="text-navy-600 max-w-sm mx-auto">
                  Experience a quick, interactive career analysis powered by AI. No login required!
                </p>
              </div>
              <div className="flex w-full gap-3 justify-center mt-6">
                <Button
                  onClick={handleStart}
                  className="bg-gradient-to-r from-autumn-500 to-navy-700 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 hover:from-autumn-600 hover:to-navy-800 hover:shadow-lg transition-all duration-300"
                >
                  Start Demo Test
                </Button>
                <Button
                  onClick={handleSkipDemo}
                  variant="outline"
                  className="border border-navy-200 text-navy-700 px-6 py-3 rounded-xl hover:bg-navy-100 transition-colors"
                >
                  Skip Demo
                </Button>
              </div>
              <button
                onClick={() => window.open('https://zaneproed.com/', '_blank')}
                className="mt-2 text-xs underline text-autumn-700 hover:text-autumn-500 transition"
              >
                Learn More
              </button>
            </div>
          )}
          {/* QUESTIONS */}
          {!isIntro && !isLoadingStep && !isResultStep && step >= 1 && step <= questionsLength && (
            <div className="animate-fade-in">
              <div className="flex flex-col gap-4 items-center">
                <div className="w-full flex justify-center">
                  {demoQuestions[step - 1].icon}
                </div>
                <h3 className="text-xl font-bold text-navy-700 mb-2">{demoQuestions[step - 1].question}</h3>
                <div className="flex flex-col gap-3 w-full mt-2">
                  {demoQuestions[step - 1].options.map((option, idx) => (
                    <Button
                      key={option}
                      onClick={() => handleAnswer(idx)}
                      className="w-full bg-gradient-to-r from-navy-700 to-autumn-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 hover:from-navy-800 hover:to-autumn-600 hover:shadow-lg transition-all duration-150"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* LOADING */}
          {isLoadingStep && (
            <div className="flex flex-col items-center justify-center min-h-[240px] gap-7 animate-fade-in">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <div className="absolute w-full h-full animate-spin rounded-full border-4 border-autumn-300 border-t-navy-700" />
                <Activity className="w-16 h-16 text-autumn-600 animate-pulse" />
                <span className="absolute bottom-0 text-xs text-slate-500 left-0 right-0 text-center animate-fade-in">&nbsp;Analyzing your answers...</span>
              </div>
              <div className="w-full max-w-xs">
                <Progress value={85} className="h-2" />
              </div>
              <span className="text-navy-700 text-lg font-semibold animate-pulse">AI is working its magic...</span>
            </div>
          )}
          {/* RESULT */}
          {isResultStep && showResult && (
            <div className="flex flex-col items-center gap-5 animate-fade-in w-full">
              <h3 className="text-2xl font-bold text-navy-800 mb-4">Your AI Career Insights</h3>
              <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs mx-auto flex flex-col gap-2">
                <div className="w-full h-60">
                  <ResponsiveContainer width="100%" height="95%">
                    <BarChart data={demoGraphData}>
                      <XAxis dataKey="category" stroke="#C75B56" fontSize={12} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#f8fafc", borderRadius: 10 }}
                        labelClassName="text-navy-700"
                      />
                      <Bar dataKey="value" radius={[8,8,0,0]}>
                        {demoGraphData.map((e, i) => (
                          <Cell key={e.category} fill={chartColors[i % chartColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-4 flex flex-col gap-1">
                  {demoGraphData.map((rec, i) => (
                    <li className="flex items-center gap-2" key={rec.category}>
                      <span className="inline-block w-2 h-2 rounded-full mr-1"
                        style={{ backgroundColor: chartColors[i % chartColors.length] }} />
                      <span className="font-semibold text-navy-700">{rec.category}:</span>
                      <span className="text-slate-700 text-sm">{rec.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-autumn-500 to-navy-700 shadow-md text-white px-7 py-2 rounded-xl font-medium mt-4 hover:scale-105 hover:from-autumn-600 hover:to-navy-800 text-lg transition-all"
              >
                Discover Your Personalized Career Path!
              </Button>
              <p className="text-xs text-slate-600">
                Want a personalized analysis? <span className="underline text-autumn-700 cursor-pointer" onClick={() => window.location.href = '/auth'}>Sign up</span> now!
              </p>
            </div>
          )}
          {/* NEXT/AI Animation Trigger after questions */}
          {!isIntro && isLastQuestion && !showResult && (
            <div className="flex flex-col gap-3 items-center animate-fade-in w-full">
              <Button
                onClick={handleShowResult}
                className="w-full bg-gradient-to-r from-autumn-500 to-navy-700 text-white px-7 py-3 rounded-xl font-semibold hover:scale-105 hover:from-autumn-600 hover:to-navy-800 hover:shadow-lg text-lg transition-all"
              >
                Analyze My Answers
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
