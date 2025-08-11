"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import MyImage from "@/assets/images/me.jpg";

export function AboutHero() {
    const unbxdUrl = "https://beunbxd.com";
    return (
        <div className="relative flex flex-col items-center justify-center space-y-8 px-6 py-32 md:px-32">
            {/* Background layer */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="w-full h-full bg-background-light dark:bg-background-dark"></div>
            </div>

            {/* Title */}
            <div className="max-w-2xl flex flex-col items-center justify-center">
                <h1 className="text-[4em] sm:text-[8.75rem] font-bold font-[family-name:var(--font-acorn-bold)]">
                    I'm Alvin
                </h1>
            </div>

            {/* Content section with image and text */}
            <div className="w-full flex flex-col sm:flex-row items-start justify-center space-y-8 sm:space-y-0 sm:space-x-12">
                {/* Image container - fixed only within hero */}
                <div className="sm:w-2/5 flex flex-col items-center justify-center sm:sticky sm:top-20">
                    <Image
                        src={MyImage}
                        alt="Alvin"
                        width={400}
                        height={400}
                        className="rounded-t-full"
                    />
                </div>

                {/* Text content */}
                <div className="sm:w-3/5 flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-[1.35em] md:text-[2.5em] font-medium font-[family-name:var(--font-acorn-medium)]">
                        A Solution Architect & Front-end Engineer, who loves crafting intelligent and beautiful looking things that live on the internet.
                    </h2>
                    <p className="text-[1em] md:text-[1.25em]">
                        Over the past decade, I’ve explored nearly every corner of the digital product space — from solution architecture and front-end engineering to UI design, systems architecture, and user experience design. Along the way, I’ve learned that the best products are born where design thinking, technical precision, and business strategy meet.
                    </p>
                    <p className="text-[1em] md:text-[1.25em]">
                        I’ve worn many hats — designer, engineer, architect, and team lead — and I’m proud of the versatility that brings to my work. Whether I’m mapping out complex systems, building intuitive interfaces, or shaping end-to-end product strategies, my goal is always the same: create solutions that work beautifully for people and scale effortlessly for businesses.
                    </p>
                    <p className="text-[1em] md:text-[1.25em]">
                        These days, I focus on leading projects at{" "}
                        <Link href={unbxdUrl} className="italic hover:cursor-pointer">
                            Unbxd Creative Lab
                        </Link>
                        , a digital product studio I co-founded. We partner with startups, enterprises, and visionary teams to design, build, and scale impactful digital products — from early prototypes to full-scale platforms. You might know some of our work from projects like KontrolPad (an IoT-driven fuel station pricing and operations platform) and Digimote (a next-gen digital signage control solution).
                    </p>
                    <p className="text-[1em] md:text-[1.25em]">
                        I thrive on solving complex problems, translating ideas into products people love, and pushing both myself and my team to new heights.
                    </p>
                    <p className="text-[1em] md:text-[1.25em] font-medium font-[family-name:var(--font-acorn-medium)]">
                        If you’re working on something ambitious and need a partner to bring it to life — let’s talk.
                    </p>
                </div>
            </div>
        </div>
    );
}