
import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

const themes = [
  {
    key: "light",
    label: "Light",
    icon: <Sun className="w-4 h-4" />,
  },
  {
    key: "dark",
    label: "Dark",
    icon: <Moon className="w-4 h-4" />,
  },
  {
    key: "system",
    label: "System",
    icon: <Monitor className="w-4 h-4" />,
  },
];

// Helper to get system theme
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const ThemeSwitch: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Set theme on mount and when toggled
  useEffect(() => {
    // Get preferred theme from localStorage, or system
    const localTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
    setTheme(localTheme);

    if (localTheme === "system") {
      setHtmlTheme(getSystemTheme());
    } else {
      setHtmlTheme(localTheme);
    }

    // Listen for system changes if using system preference
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const systemListener = () => {
      if (
        localStorage.getItem("theme") === "system"
      ) {
        setHtmlTheme(getSystemTheme());
      }
    };
    mql.addEventListener("change", systemListener);

    return () => {
      mql.removeEventListener("change", systemListener);
    };
  }, []);

  // Helper to set html theme
  const setHtmlTheme = (mode: "light" | "dark") => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const changeTheme = (mode: "light" | "dark" | "system") => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    if (mode === "system") {
      setHtmlTheme(getSystemTheme());
    } else {
      setHtmlTheme(mode);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {themes.map((t) => (
        <button
          key={t.key}
          aria-label={t.label}
          className={`p-2 rounded-full border border-gray-300 dark:border-gray-700 transition-colors
            ${theme === t.key ? "bg-[#F5F5F5] dark:bg-[#232323] border-black dark:border-[#E0E0E0]" : "bg-white dark:bg-[#232323]"}
            hover:ring-2 hover:ring-autumn-500 focus:outline-none`}
          onClick={() => changeTheme(t.key as "light" | "dark" | "system")}
        >
          <span
            className={`${
              theme === t.key
                ? "text-autumn-600 dark:text-autumn-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {t.icon}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitch;
