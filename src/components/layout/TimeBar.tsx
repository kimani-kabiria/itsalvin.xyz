"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function TimeBarThemeSwitcher() {
  const [theme, setTheme] = useState("light"); // 'light' or 'dark'
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [selectedHour, setSelectedHour] = useState(currentHour);
  const hours = Array.from({ length: 24 }, (_, i) => i); // Array of 24 hours

  // Change theme based on time
  const updateThemeBasedOnTime = (hour: number) => {
    if (hour >= 6 && hour <= 18) {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  // Automatically switch theme on page load based on the current time
  useEffect(() => {
    const currentHour = new Date().getHours();
    setCurrentHour(currentHour);
    updateThemeBasedOnTime(currentHour);
  }, []);

  // Handle click on each hour
  const handleHourClick = (hour: number) => {
    setSelectedHour(hour); // Update the selected hour
    updateThemeBasedOnTime(hour);
  };

  return (
    <div className="relative flex items-center justify-center py-12 mb-8 mx-auto">
      {/* Time Bars */}
      <div className="flex items-center space-x-1 sm:space-x-6">
        {hours.map((hour) => (
          <div
            key={hour}
            className="relative group flex justify-center w-3 sm:w-8 h-10" // Make each time block larger
            onClick={() => handleHourClick(hour)}
          >
            <button
              className={`w-0.5 h-4 md:h-6 cursor-pointer transition-all duration-300 transform ${
                hour === selectedHour
                  ? "bg-green-500 h-6 md:h-8"
                  : hour >= 6 && hour <= 18
                  ? "bg-yellow-200"
                  : "bg-gray-800"
              } group-hover:scale-125`} // Magnify on hover
            />
            
            {/* Current Hour Indicator */}
            {hour === selectedHour && (
              <div className="absolute -top-12 text-center transition-all duration-300 ease-in-out">
                {theme === "light" ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-400" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
