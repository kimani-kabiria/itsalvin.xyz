"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AboutHero, Experience, Storyline } from "@/content/about";
import { Experience as ExperienceType } from "@/types/sanity";

export default function AboutClient({ experiences }: { experiences: ExperienceType[] }) {
    // One shared scroll tracker for the entire page
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    // Experience section: active from scroll 0% → 50%
    const experienceProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const experienceOpacity = useTransform(scrollYProgress, [0.5, 0.55], [1, 0]); // fade out slightly at end

    // Storyline section: starts only after Experience is ~80% done
    const storylineProgress = useTransform(scrollYProgress, [0.45, 1], [0, 1]);
    const storylineOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]); // fade in smoothly

    return (
        <div ref={containerRef} className="px-6">
            {/* <AboutHero scrollProgress={heroProgress} /> */}
            <AboutHero />

            {/* EXPERIENCE – controlled by shared scroll */}
            <div className="py-32">
                <ExperienceScrollWrapper progress={experienceProgress} opacity={experienceOpacity} experiences={experiences} />
            </div>

            {/* STORYLINE – starts after Experience */}
            <div className="py-32">
                <StorylineScrollWrapper progress={storylineOpacity} opacity={storylineOpacity} />
            </div>
        </div>
    );
}

// Wrapper to pass scroll progress into Experience
function ExperienceScrollWrapper({ progress, opacity, experiences }: { progress: any; opacity: any; experiences: ExperienceType[] }) {
    return (
        <motion.div style={{ opacity }}>
            <Experience scrollProgress={progress} experiences={experiences} />
        </motion.div>
    );
}

// Wrapper to pass scroll-control Storyline
function StorylineScrollWrapper({ progress, opacity }: { progress: any; opacity: any }) {
    return (
        <motion.div style={{ opacity }}>
            <Storyline scrollProgress={progress} />
        </motion.div>
    );
}
