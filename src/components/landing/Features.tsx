
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    { title: "Smart Profile Analysis", desc: "AI analyzes your PharmD/B.Pharm background to identify optimal career paths", gradient: "from-blue-500 to-cyan-500" }, 
    { title: "Real-time Job Scanning", desc: "Continuously monitors pharmaceutical job boards for fresh opportunities", gradient: "from-navy-500 to-blue-500" }, 
    { title: "Custom Resume Generation", desc: "Creates unique, ATS-optimized resumes tailored for pharmaceutical roles", gradient: "from-autumn-500 to-red-500" }, 
    { title: "Automated Applications", desc: "Applies to relevant pharma positions across multiple platforms automatically", gradient: "from-green-500 to-emerald-500" }, 
    { title: "Pharmaceutical Skills Gap Analysis", desc: "Identifies missing skills and recommends learning paths for pharmacy careers", gradient: "from-purple-500 to-indigo-500" }, 
    { title: "Career Progress Tracking", desc: "Monitor application status, interview feedback, and career advancement", gradient: "from-teal-500 to-green-500" }
];

const Features = () => {
    return (
        <section id="features" className="bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-navy-800 mb-4">Why Choose Zane AI</h2>
                    <p className="text-xl text-slate-600">Everything you need for career success</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-white border border-slate-200 hover:border-navy-300 transition-all duration-300 group hover:shadow-lg rounded-xl">
                            <CardHeader>
                                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                                </div>
                                <CardTitle className="text-navy-800 text-lg font-semibold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <CardDescription className="text-slate-600 leading-relaxed">
                                    {feature.desc}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
