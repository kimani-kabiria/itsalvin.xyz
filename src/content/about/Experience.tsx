"use client";

import { motion, useTransform } from "motion/react";
import { useRef } from "react";

type ExperienceProps = {
  scrollProgress?: any;
};

export function Experience({ scrollProgress }: ExperienceProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = scrollProgress || 0;

  const experiences = [
    { company: "Unbxd Creative Lab", role: "Co-Founder", years: "2022 ~", row: 1, colStart: 21, colSpan: 6 },
    { company: "Co-operative Bank of Kenya", role: "Full Stack Engineer", years: "May 2020 ~ ", row: 2, colStart: 12, colSpan: 10 },
    { company: "Freelance", role: "Architect & Designer", years: "2016 ~ 2020", row: 3, colStart: 10, colSpan: 16 },
    { company: "Topaz Digital", role: "Web & Embedded Engineer", years: "2017-2018", row: 4, colStart: 6, colSpan: 6 },
    { company: "Geekmergency", role: "C.T.O", years: "2013 - 2016", row: 5, colStart: 1, colSpan: 5 },
  ] as const;

  return (
    <section ref={containerRef} className="relative w-full py-12">
      <div className="px-8">
        {/* Center line */}
        <div className="pointer-events-none hidden inset-x-0 top-0 -z-10 mx-auto h-full w-px">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{ scaleY: progress, transformOrigin: "top" }}
          />
        </div>

        <div className="grid grid-cols-26 grid-rows-5 gap-4">
          {experiences.map((job, i) => {
            const start = i * 0.18;
            const end = start + 0.25;
            const cardProgress = useTransform(progress, [start, end], [0, 1]);

            const y = useTransform(cardProgress, [0, 1], [320, 0]);
            const opacity = useTransform(cardProgress, [0, 1], [0, 1]);
            const scale = useTransform(cardProgress, [0, 1], [0.82, 1]);

            return (
              <motion.div
                key={i}
                style={{
                  y,
                  opacity,
                  scale,
                  gridRow: job.row,
                  gridColumn: `${job.colStart} / span ${job.colSpan}`,
                }}
                className="relative"
              >
                {/* This inner div handles hover only — no conflict */}
                <motion.div
                  className="flex h-full flex-col justify-center rounded-2xl bg-primary dark:bg-primary/40 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8"
                //   whileHover={{
                //     scale: 1.06,
                //     y: -20,
                //     boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                //   }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight sm:text-2xl font-[family-name:var(--font-acorn-bold)]">
                        {job.company}
                      </h3>
                      <p className="mt-2 text-sm opacity-90 sm:text-base">{job.role}</p>
                    </div>
                    <div className="text-right text-sm font-medium sm:text-base">
                      {job.years}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}