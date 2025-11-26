"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MyImage from "@/assets/images/me.jpg";

export function AboutHero() {
    const unbxdUrl = "https://beunbxd.com";

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" />
            <motion.div
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center"
            >
                {/* Title */}
                <div className="max-w-2xl flex flex-col items-center justify-center">
                    <h1 className="text-[4em] sm:text-[8.75rem] font-bold font-[family-name:var(--font-acorn-bold)]">
                        I&apos;m Alvin
                    </h1>
                </div>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.6, delay: 0.6 }}
                    className="h-2 w-96 mx-auto mt-2 bg-primary rounded-full"
                />
            </motion.div>

            <div className="relative w-full max-w-7xl mt-32 flex flex-col lg:flex-row items-start justify-center gap-20 px-6">
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="flex-shrink-0"
                >
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition duration-1000" />
                        <Image
                            src={MyImage}
                            alt="Alvin"
                            width={440}
                            height={440}
                            className="relative rounded-t-full shadow-2xl ring-8 ring-white/10 transition-all duration-700 group-hover:ring-primary/50 group-hover:scale-105"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 1 }}
                    className="flex-1 max-w-3xl"
                >
                    <h2 className="text-[1.35em] md:text-[2.5em] font-medium font-[family-name:var(--font-acorn-medium)] py-4">
                        A Solution Architect & Front-end Engineer, who loves crafting intelligent and beautiful looking things that live on the internet.
                    </h2>

                    {[
                        "Over the past decade, I’ve explored nearly every corner of the digital product space — from solution architecture and front-end engineering to UI design and systems thinking.",
                        "I’ve worn many hats — designer, engineer, architect, and team lead — and I’m proud of the versatility that brings to my work.",
                        `These days, I lead projects at <a href="${unbxdUrl}" class="text-primary hover:underline italic">Unbxd Creative Lab</a>, a studio I co-founded.`,
                        "I thrive on solving complex problems and turning ambitious ideas into products people love.",
                        "If you’re building something bold — let’s talk.",
                    ].map((text, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + i * 0.2, duration: 0.9 }}
                            className="text-[1em] md:text-[1.25em] py-2"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
                </div>
            </motion.div> */}
        </section>
    );
}