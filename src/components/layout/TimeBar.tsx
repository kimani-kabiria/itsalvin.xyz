"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function TimeBarThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const updateThemeBasedOnTime = (hour: number) => {
    if (hour >= 6 && hour <= 18) {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    const h = new Date().getHours();
    setCurrentHour(h);
    setSelectedHour(h);
    updateThemeBasedOnTime(h);
  }, []);

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    updateThemeBasedOnTime(hour);
  };

  return (
    <div className="relative flex items-center justify-center py-12 mb-8 w-full px-4">
      {/* Sun/Moon icon floats above the bar, positioned absolutely relative to wrapper */}
      <div className="relative w-full max-w-2xl">
        {/* Icon row — sits above the bars */}
        <div className="relative h-10 mb-2">
          <motion.div
            className="absolute transition-all duration-300 ease-in-out"
            animate={{
              left: `calc(${(selectedHour / 23) * 100}% )`,
              transform: "translateX(-50%)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: theme === "light" ? [0, 10, -10, 0] : [0, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {theme === "light" ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Bars row — fills full width evenly */}
        <div className="flex items-end justify-between w-full px-2 sm:px-4 gap-2 sm:gap-6">
          {hours.map((hour) => (
            <motion.button
              key={hour}
              onClick={() => handleHourClick(hour)}
              aria-label={`Select ${hour}:00`}
              className="group flex flex-col items-center justify-end flex-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: hour * 0.02,
                duration: 0.3,
              }}
            >
              <motion.span
                className={`
                  block w-0.5 sm:w-1 rounded-full cursor-pointer
                  ${
                    hour === selectedHour
                      ? "bg-green-500 h-6 sm:h-8 shadow-lg shadow-green-500/50"
                      : hour >= 6 && hour <= 18
                      ? "bg-yellow-300 dark:bg-yellow-200 h-3 sm:h-4"
                      : "bg-gray-400 dark:bg-gray-600 h-3 sm:h-4"
                  }
                `}
                whileHover={{
                  scaleY: 1.5,
                  scaleX: 1.25,
                  brightness: 1.1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}