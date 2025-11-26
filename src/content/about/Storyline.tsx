"use client";

import { motion, useTransform } from "motion/react";
import { useRef } from "react";

type StorylineProps = {
    scrollProgress?: any;
};

export function Storyline({ scrollProgress }: StorylineProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = scrollProgress || 0;

    const StorylineData = [
        {
            title: "The Beginning",
            description: "Ever since I wrote my very first Hello, World! in C, I knew I was hooked. That single line of code opened a universe where creativity meets logic...",
        },
        {
            title: "The Journey",
            description: "Over the past 10 years, that passion has taken me through every corner of product design and development — from solution architecture and front-end engineering to UI design...",
        },
        {
            title: "Beyond the Screen",
            description: "But I’m not just about pixels and code. Away from the screen, I’m a big Formula 1 fan (a proud Ferrari Tifosi), and I love exploring the world with my partner...",
        },
        {
            title: "The Drive",
            description: "At my core, I’m driven by curiosity — whether it’s exploring how to make a system more elegant or finding the best track-side view at Monza.",
        },
    ];

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Sticky header */}
            <div className="sticky top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-sm">
                <div className="max-w-2xl mx-auto py-4">
                    <h2 className="text-[3em] sm:text-[6.75rem] font-bold font-[family-name:var(--font-acorn-bold)] text-center">
                        My Story
                    </h2>
                </div>
            </div>

            {/* Content with proper spacing */}
            <div className="relative z-10 sm:mx-auto sm:max-w-5xl px-3 sm:px-8 pt-8">
                {/* The Film Reel Strip */}
                <motion.div
                    className="relative"
                    style={{
                        y: useTransform(progress, [0, 1], [300, -100]), // long smooth travel
                    }}
                >

                    <div className="space-y-24"> {/* extra space for smooth scroll */}
                        {StorylineData.map((item, i) => {
                            const start = i * 0.2;
                            const end = start + 0.4;
                            const cardProgress = useTransform(progress, [start, end], [0, 1]);

                            const opacity = useTransform(cardProgress, [0, 1], [0.3, 1]);
                            const scale = useTransform(cardProgress, [0, 1], [0.8, 1]);
                            const filter = useTransform(cardProgress, [0, 1], ["blur(8px)", "blur(0px)"]);

                            return (
                                <motion.div
                                    key={i}
                                    style={{ opacity, scale, filter }}
                                    className="relative sm:mx-auto sm:max-w-3xl"
                                >
                                    {/* Film frame border */}
                                    <div className="rounded-3xl p-6 sm:p-16 shadow-2xl bg-primary dark:bg-primary/5 backdrop-blur-md">
                                        <motion.div
                                            style={{ filter }}
                                            className="space-y-6 text-center"
                                        >
                                            <h3 className="text-white text-4xl font-black tracking-tighter sm:text-7xl md:text-8xl font-[family-name:var(--font-acorn-bold)]">
                                                {item.title}
                                            </h3>
                                            <p className="mx-auto max-w-2xl sm:text-lg leading-relaxed text-gray-300 md:text-xl">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}