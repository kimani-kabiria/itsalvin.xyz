"use client";

import Image from "next/image";

import { Hero } from "@/content/landing";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
    </div>
  );
}
