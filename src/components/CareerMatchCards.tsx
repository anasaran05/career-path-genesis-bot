
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CareerRole {
  title: string;
  description: string;
  emoji: string;
  matchScore?: number; // 0-100
}

interface CareerMatchCardsProps {
  roles: CareerRole[];
  summary?: string;
}

const COLORS = {
  navy: "#002B5B",
  autumn: "#D63447",
  beige: "#F5F5F5",
};

const FONT = "font-sans"; // Inter/Helvetica fallback

const CareerMatchCards: React.FC<CareerMatchCardsProps> = ({ roles, summary }) => {
  return (
    <section className={`w-full py-8 px-2 max-w-3xl mx-auto ${FONT}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
          {summary ||
            "Based on your skills and profile, here’s where you shine the most."}
        </h2>
      </div>
      <div className="space-y-8">
        {roles.map((role, i) => (
          <div
            key={role.title}
            className="bg-white rounded-2xl shadow-xl border-l-8"
            style={{
              borderColor: COLORS.autumn,
              fontFamily: "Inter, Helvetica, Arial, sans-serif",
            }}
          >
            <div className="p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{role.emoji}</span>
                <h3 className="text-xl font-bold" style={{ color: COLORS.navy }}>
                  {role.title}
                </h3>
              </div>
              <p className="text-base text-gray-700">{role.description}</p>
              <div className="flex items-center gap-3 mt-4">
                <span
                  className="text-xs font-semibold"
                  style={{ color: COLORS.autumn }}
                >
                  Career Match Score
                </span>
                <span className="text-xs font-bold text-navy-700 ml-auto">
                  {role.matchScore !== undefined ? `${role.matchScore}%` : ""}
                </span>
              </div>
              <Progress
                value={role.matchScore ?? 76 + i * 8}
                className="h-3 bg-gray-200"
                style={{
                  background: COLORS.beige,
                  "--tw-bg-opacity": "1",
                } as React.CSSProperties}
              />
              <div className="pt-4">
                <Button
                  className="bg-gradient-to-r from-[#002B5B] to-[#D63447] text-white font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.navy} 0%, ${COLORS.autumn} 90%)`,
                    fontFamily: "Inter, Helvetica, Arial, sans-serif",
                  }}
                >
                  Explore This Role
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-lg text-center font-semibold" style={{ color: COLORS.autumn }}>
        You’re one step closer to your dream role 🔥 Keep exploring.
      </div>
    </section>
  );
};

export default CareerMatchCards;

