
import React from 'react';
import { Brain } from "lucide-react";

const Footer = () => {
    return (
        <footer id="contact" className="bg-white border-t border-slate-200">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-3 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-navy-700 font-bold text-lg">Zane AI</span>
                            <p className="text-slate-500 text-sm">by ZaneProEd</p>
                        </div>
                    </div>
                    <div className="text-slate-500 text-sm">© 2024 ZaneProEd. Transforming careers with intelligence.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
