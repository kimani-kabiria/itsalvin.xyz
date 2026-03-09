'use client';

import { useState } from 'react';
import { X, BookOpen, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              mass: 0.8
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div 
              className="relative px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3 
                    }}
                  >
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <h2 className="text-xl font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white">
                    About This Blog
                  </h2>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  initial={{ rotate: 0, scale: 1 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0.8 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Welcome Section */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 2 
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Welcome to My Digital Garden</h3>
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Welcome to my blog where I share thoughts, tutorials, and insights about web development, 
                  technology, and creative coding. Stay tuned for regular updates!
                </p>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { emoji: "🚀", title: "Web Dev", desc: "Modern frameworks & best practices" },
                  { emoji: "💡", title: "Innovation", desc: "Cutting-edge tech insights" },
                  { emoji: "🎨", title: "Design", desc: "UI/UX & creative coding" },
                  { emoji: "📚", title: "Learning", desc: "Tutorials & guides" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <motion.div 
                      className="text-2xl mb-2"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3 + index,
                        ease: "easeInOut"
                      }}
                    >
                      {item.emoji}
                    </motion.div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                className="text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div className="flex items-center justify-center gap-1">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      color: ["#ef4444", "#dc2626", "#ef4444"]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 1 
                    }}
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Made with passion for the developer community
                  </span>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.5)",
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Exploring
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
