
import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle: React.FC = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <div className="flex gap-1 items-center">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        aria-label="Light"
        size="icon"
        onClick={() => setTheme("light")}
        className="rounded-full"
      >
        <Sun className="w-5 h-5" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        aria-label="Dark"
        size="icon"
        onClick={() => setTheme("dark")}
        className="rounded-full"
      >
        <Moon className="w-5 h-5" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        aria-label="System"
        size="icon"
        onClick={() => setTheme("system")}
        className="rounded-full"
      >
        <Laptop2 className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ThemeToggle;
