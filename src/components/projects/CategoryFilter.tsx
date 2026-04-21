"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { Project } from "@/types/sanity";

interface CategoryFilterProps {
  projects: Project[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({ projects, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  // Extract unique categories from projects
  const categories = projects.reduce((acc, project) => {
    if (project.categories) {
      project.categories.forEach(category => {
        if (!acc.find(cat => cat._id === category._id)) {
          acc.push(category);
        }
      });
    }
    return acc;
  }, [] as Project['categories']);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* All Projects Badge */}
        <motion.button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === null
              ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Projects
        </motion.button>

        {/* Category Badges */}
        {categories.map((category) => (
          <motion.button
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category._id
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.title}
          </motion.button>
        ))}

        {/* Clear Filter */}
        {selectedCategory && (
          <motion.button
            onClick={() => onCategoryChange(null)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            Clear
          </motion.button>
        )}
      </div>
    </div>
  );
}
