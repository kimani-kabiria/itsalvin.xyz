"use client";

import { AboutHero, Experience, Storyline } from "@/content/about";

export default function About(){
    return (
        <div className="px-6">
            <AboutHero />
            <Experience />
            <Storyline />
        </div>
    );
}