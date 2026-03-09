'use client';

import { useState } from 'react';
import type { Category } from '@/types/sanity';
import { X, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div className="flex items-center gap-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <h3 className="text-lg font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white">Categories</h3>
      </motion.div>
      
      <div className="space-y-2">
        <motion.button
          onClick={() => onCategoryChange(null)}
          className={`
            w-full text-left px-4 py-2 rounded-lg
            ${selectedCategory === null
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ 
            scale: 1.02, 
            x: 4,
            transition: { type: "spring", stiffness: 400 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span className="flex items-center gap-2">
            <motion.span 
              className="w-2 h-2 rounded-full"
              animate={{ 
                backgroundColor: selectedCategory === null ? "#2563eb" : "#9ca3af",
                scale: selectedCategory === null ? 1.25 : 1
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            All Posts
          </motion.span>
        </motion.button>
        
        {categories.map((category, index) => (
          <motion.button
            key={category._id}
            onClick={() => onCategoryChange(category.title)}
            className={`
              w-full text-left px-4 py-2 rounded-lg
              ${selectedCategory === category.title
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ 
              scale: 1.02, 
              x: 4,
              transition: { type: "spring", stiffness: 400 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span className="flex items-center gap-2">
              <motion.span 
                className="w-2 h-2 rounded-full"
                animate={{ 
                  backgroundColor: selectedCategory === category.title ? "#2563eb" : "#9ca3af",
                  scale: selectedCategory === category.title ? 1.25 : 1
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {category.title}
            </motion.span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.button
            onClick={() => onCategoryChange(null)}
            className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: selectedCategory ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <X className="w-4 h-4" />
            </motion.div>
            Clear filter
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
