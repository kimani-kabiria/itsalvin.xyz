"use client";

import { motion, useScroll, useTransform } from "motion/react"; // Fixed import
import { useRef } from "react";

export function Storyline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const StorylineData = [
    {
      title: "The Beginning",
      description:
        "Ever since I wrote my very first Hello, World! in C, I knew I was hooked. That single line of code opened a universe where creativity meets logic, and I’ve been obsessed ever since — solving problems, building systems, and crafting digital experiences with my favorite superpower: coding.",
    },
    {
      title: "The Journey",
      description:
        "Over the past 10 years, that passion has taken me through every corner of product design and development — from solution architecture and front-end engineering to UI design and user experience strategy. Today, I channel that experience into creating end-to-end solutions at Unbxd Creative Lab, helping clients turn ideas into products that scale.",
    },
    {
      title: "Beyond the Screen",
      description:
        "But I’m not just about pixels and code. Away from the screen, I’m a big Formula 1 fan (a proud Ferrari Tifosi), and I love exploring the world with my partner — chasing new experiences, new places, and maybe the perfect espresso.",
    },
    {
      title: "The Drive",
      description:
        "At my core, I’m driven by curiosity — whether it’s exploring how to make a system more elegant or finding the best track-side view at Monza.",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.01, 0, 0.9] as const,
      },
    },
  };

  return (
    <div ref={containerRef} className="relative w-full py-24 flex flex-col items-center">
      <div className="max-w-4xl w-full px-4">
        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-4 md:left-8 top-8 bottom-8 w-px bg-gray-800/20" aria-hidden="true" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-4 md:left-8 top-8 w-px origin-top bg-gradient-to-b from-primary to-primary/60"
            style={{ scaleY: lineHeight }}
            aria-hidden="true"
          />

          <div className="ml-8 md:ml-12 space-y-32">
            {StorylineData.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3, margin: "-100px" }}
                variants={itemVariants}
                className="relative will-change-transform"
                style={{ transform: "translateZ(0)" }}
              >
                {/* Pin dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                  className="absolute -left-4 md:-left-6 top-10 z-10 w-4 h-4 bg-primary rounded-full ring-8 ring-primary/20 shadow-lg shadow-primary/40"
                />

                {/* CARD WITH SUBTLE POP-OUT HOVER */}
                <motion.div
                  className="overflow-hidden rounded-2xl border border-white/10 bg-primary dark:bg-primary/5 backdrop-blur-xl p-8 md:p-10 shadow-xl"
                  whileHover={{
                    scale: 1.15,
                    y: -12,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 40px rgba(124, 58, 237, 0.3)", // subtle purple glow
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  style={{ transform: "translateZ(0)" }} // keep GPU
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-acorn-bold)]"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.9 }}
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}