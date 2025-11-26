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

    // Pre-calculate all animations
    const animations = experiences.map((_, i) => {
        const start = i * 0.18;
        const end = start + 0.25;
        const cardProgress = useTransform(progress, [start, end], [0, 1]);
        
        return {
            y: useTransform(cardProgress, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress, [0, 1], [0, 1]),
            scale: useTransform(cardProgress, [0, 1], [0.9, 1])
        };
    });

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Sticky header */}
            <div className="sticky top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-sm">
                <div className="mx-auto py-4">
                    <h2 className="text-[3em] sm:text-[6.75rem] font-bold font-[family-name:var(--font-acorn-bold)] text-center">
                        My Experience
                    </h2>
                </div>
            </div>

            {/* Content with proper spacing */}
            <div className="relative z-10 mx-auto px-4 sm:px-8 pt-8">
                {/* Center line - hidden on mobile */}
                <div className="hidden pointer-events-none fixed inset-x-0 top-0 -z-10 mx-auto h-full w-px">
                    <motion.div
                        className="h-full w-full bg-gradient-to-b from-transparent via-primary to-transparent"
                        style={{ scaleY: progress, transformOrigin: "top" }}
                    />
                </div>

                {/* Mobile layout (single column) */}
                <div className="block md:hidden space-y-6">
                    {experiences.map((job, i) => {
                        const { y, opacity, scale } = animations[i];

                        return (
                            <motion.div
                                key={`mobile-${i}`}
                                style={{ y, opacity, scale }}
                                className="w-full"
                            >
                                <motion.div
                                    className="flex h-full flex-col justify-center rounded-2xl bg-primary dark:bg-primary/40 p-6 text-white shadow-2xl backdrop-blur-sm"
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                >
                                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight sm:text-2xl font-[family-name:var(--font-acorn-bold)]">
                                                {job.company}
                                            </h3>
                                            <p className="mt-1 text-sm opacity-90 sm:mt-2 sm:text-base">{job.role}</p>
                                        </div>
                                        <div className="text-sm font-medium sm:text-base sm:text-right">
                                            {job.years}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Desktop layout (staggered grid) */}
                <div className="hidden md:grid md:grid-cols-26 md:grid-rows-5 md:gap-4">
                    {experiences.map((job, i) => {
                        const { y, opacity, scale } = animations[i];

                        return (
                            <motion.div
                                key={`desktop-${i}`}
                                style={{ 
                                    y, 
                                    opacity, 
                                    scale,
                                    gridRow: job.row,
                                    gridColumn: `${job.colStart} / span ${job.colSpan}`
                                }}
                                className="relative"
                            >
                                <motion.div
                                    className="flex h-full flex-col justify-center rounded-2xl bg-primary dark:bg-primary/40 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8"
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight sm:text-2xl font-[family-name:var(--font-acorn-bold)]">
                                                {job.company}
                                            </h3>
                                            <p className="mt-2 text-sm opacity-90 sm:text-base">{job.role}</p>
                                        </div>
                                        <div className="text-sm font-medium sm:text-base text-right">
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