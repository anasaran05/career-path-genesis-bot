import React from 'react';
import { Button } from "@/components/ui/button";

interface CTAProps {
    handleGetStarted: () => void;
}

const CTA: React.FC<CTAProps> = ({ handleGetStarted }) => {
    return (
        <section className="bg-gradient-to-r from-navy-600 to-autumn-500 py-20">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
                    <p className="text-xl text-white/90 mb-8">Join thousands of graduates who've accelerated their career success with Zane AI</p>
                    <Button onClick={handleGetStarted} size="lg" className="bg-white text-navy-700 hover:bg-slate-100 px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        Begin Your Journey with Zane AI
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTA;