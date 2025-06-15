
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Search, FileText } from "lucide-react";

const processSteps = [
    { icon: User, title: "Background Collection", desc: "Complete intake of education, skills, and goals", step: "01", color: "from-blue-500 to-blue-600" }, 
    { icon: Search, title: "Interest Analysis", desc: "AI analyzes your profile for perfect career matches", step: "02", color: "from-navy-500 to-navy-600" }, 
    { icon: Search, title: "Job Market Scan", desc: "Real-time scanning of pharmaceutical opportunities", step: "03", color: "from-autumn-500 to-autumn-600" }, 
    { icon: FileText, title: "Path Building", desc: "Creates personalized career roadmap with action steps", step: "04", color: "from-green-500 to-green-600" }, 
    { icon: FileText, title: "CV Generation", desc: "Tailored resume and cover letter for each application", step: "05", color: "from-purple-500 to-purple-600" }, 
    { icon: Search, title: "Auto Application", desc: "Applies to relevant pharma jobs automatically", step: "06", color: "from-orange-500 to-orange-600" }, 
    { icon: FileText, title: "Advisory Report", desc: "Detailed recommendations for career improvement", step: "07", color: "from-teal-500 to-teal-600" }
];

const Process = () => {
    return (
        <section id="process" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-navy-800 mb-4">Complete Career Intelligence in 7 Steps</h2>
                    <p className="text-xl text-slate-600">Comprehensive career transformation</p>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {processSteps.map((item, index) => (
                        <Card key={index} className="bg-white border border-slate-200 hover:border-navy-300 transition-all duration-300 group hover:shadow-lg rounded-xl">
                            <CardHeader className="text-center pb-3">
                                <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-xs font-bold text-autumn-600 mb-2 tracking-wider">STEP {item.step}</div>
                                <CardTitle className="text-navy-800 text-lg font-semibold">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <CardDescription className="text-slate-600 text-center text-sm leading-relaxed">
                                    {item.desc}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
