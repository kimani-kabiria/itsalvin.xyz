"use client";

import Image from "next/image";

import { Hero } from "@/content/landing";
import { TimeBarThemeSwitcher } from "@/components/layout";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TimeBarThemeSwitcher />
    </div>
  );
}
