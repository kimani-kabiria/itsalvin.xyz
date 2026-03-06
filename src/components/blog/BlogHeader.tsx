'use client';

import { motion } from 'motion/react';

export function BlogHeader() {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-[4em] sm:text-[8.75rem] font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white mb-4 leading-tight">
        Thinking Out Loud
      </h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.6 }}
        className="h-2 w-96 mx-auto mt-2 bg-primary rounded-full"
      />
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-8">
        Where half-formed ideas, lessons, and curiosities come to stretch their legs.
      </p>
    </div>
  );
}
