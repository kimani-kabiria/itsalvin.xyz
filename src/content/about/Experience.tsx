"use client";

import { motion, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { WorkDetailModal } from "@/components/WorkDetailModal";
import { useWorkDetails } from "@/hooks/api/work";
import { Experience as ExperienceType, WorkDetail } from "@/types/sanity";

type ExperienceProps = {
    scrollProgress?: any;
    experiences?: ExperienceType[];
};

export function Experience({ scrollProgress, experiences: initialExperiences }: ExperienceProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = scrollProgress || 0;
    const experiences = initialExperiences || [];
    const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { workDetails, isLoading } = useWorkDetails(
        selectedExperience?._id || ''
    );

    const handleExperienceClick = (experience: ExperienceType) => {
        setSelectedExperience(experience);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedExperience(null);
    };

    // Pre-calculate all animations - create hooks for each experience
    
    const cardProgress0 = useTransform(progress, [0, 0.25], [0, 1]);
    const cardProgress1 = useTransform(progress, [0.18, 0.43], [0, 1]);
    const cardProgress2 = useTransform(progress, [0.36, 0.61], [0, 1]);
    const cardProgress3 = useTransform(progress, [0.54, 0.79], [0, 1]);
    const cardProgress4 = useTransform(progress, [0.72, 0.97], [0, 1]);
    const cardProgress5 = useTransform(progress, [0.9, 1.15], [0, 1]);
    
    const animations = [
        {
            y: useTransform(cardProgress0, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress0, [0, 1], [0, 1]),
            scale: useTransform(cardProgress0, [0, 1], [0.9, 1])
        },
        {
            y: useTransform(cardProgress1, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress1, [0, 1], [0, 1]),
            scale: useTransform(cardProgress1, [0, 1], [0.9, 1])
        },
        {
            y: useTransform(cardProgress2, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress2, [0, 1], [0, 1]),
            scale: useTransform(cardProgress2, [0, 1], [0.9, 1])
        },
        {
            y: useTransform(cardProgress3, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress3, [0, 1], [0, 1]),
            scale: useTransform(cardProgress3, [0, 1], [0.9, 1])
        },
        {
            y: useTransform(cardProgress4, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress4, [0, 1], [0, 1]),
            scale: useTransform(cardProgress4, [0, 1], [0.9, 1])
        },
        {
            y: useTransform(cardProgress5, [0, 1], [100, 0]),
            opacity: useTransform(cardProgress5, [0, 1], [0, 1]),
            scale: useTransform(cardProgress5, [0, 1], [0.9, 1])
        }
    ];

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
                                    className="flex h-full flex-col justify-center rounded-2xl bg-primary dark:bg-primary/40 p-6 text-white shadow-2xl backdrop-blur-sm cursor-pointer"
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                    onClick={() => handleExperienceClick(job)}
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
                                    className="flex h-full flex-col justify-center rounded-2xl bg-primary dark:bg-primary/40 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8 cursor-pointer"
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                    onClick={() => handleExperienceClick(job)}
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
            
            {/* Work Detail Modal */}
            <WorkDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                workDetails={workDetails}
                companyName={selectedExperience?.company || ''}
                role={selectedExperience?.role || ''}
            />
        </section>
    );
}