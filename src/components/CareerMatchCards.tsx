
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Zane AI brand colors
const COLORS = {
  navy: "#002B5B",
  autumn: "#D63447",
  beige: "#F5F5F5",
};

const FONT = "font-sans"; // Matches Inter/Helvetica on home

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

const CareerMatchCards: React.FC<CareerMatchCardsProps> = ({ roles, summary }) => {
  return (
    <section className={`w-full py-12 px-2 md:px-0 max-w-4xl mx-auto bg-white rounded-2xl shadow-none ${FONT}`}>
      <div className="mb-10 px-2 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-navy-600 to-autumn-500"
          style={{ fontFamily: "Inter, Helvetica, Arial, sans-serif" }}
        >
          {summary ||
            "Based on your skills and profile, here’s where you shine the most."}
        </h2>
      </div>
      <div className="space-y-8">
        {roles.map((role, i) => (
          <div
            key={role.title}
            className="
              group
              bg-white/90
              rounded-2xl 
              shadow-xl 
              border border-black
              transition-transform
              hover:scale-105
              hover:shadow-2xl
              relative
              overflow-hidden
            "
            style={{
              fontFamily: "Inter, Helvetica, Arial, sans-serif",
            }}
          >
            {/* Top accent bar like homepage card highlight */}
            <div
              className="h-2 w-full bg-gradient-to-r from-navy-600 to-autumn-500"
            />
            <div className="p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{role.emoji}</span>
                <h3 className="text-xl font-bold text-navy-700">
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
              <div className="pt-4 text-center">
                <Button
                  className="
                    bg-gradient-to-r from-navy-600 to-autumn-500
                    text-white font-bold px-8 py-2 rounded-xl
                    hover:scale-105
                    transition-transform
                    shadow-md
                    "
                  style={{
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
      <div
        className="mt-12 text-lg text-center font-semibold"
        style={{
          color: COLORS.autumn,
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
        }}
      >
        You’re one step closer to your dream role 🔥 Keep exploring.
      </div>
    </section>
  );
};

export default CareerMatchCards;
