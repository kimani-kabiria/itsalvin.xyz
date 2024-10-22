import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import clsx from "clsx";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export function Hero() {
  return (
    <div className="flex flex-col px-4 md:px-28 pt-32 justify-center">
      <h1 className={cn("text-[3em] md:text-[6em] font-bold text-center", fontSans.variable)}>
        Hi, I'm Alvin 👋
      </h1>
      <div className="md:px-64 px-2">
      <h2 className="text-[1.35em] md:text-[2em] font-medium text-left md:text-center">
        An Engineer & Designer , who loves
        crafting intelligent and beautiful looking things that live on the internet.
      </h2>
      </div>
    </div>
  );
}
