import { cn } from "@/lib/utils";
import clsx from "clsx";
import Lottie from "react-lottie";

import Hello from "@/assets/lotties/hello.json";
import Developer from "@/assets/lotties/developer.json";

export function Hero() {
  const helloOptions = {
    loop: true,
    autoplay: true,
    animationData: Hello,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const developerOptions = {
    loop: true,
    autoplay: true,
    animationData: Developer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:px-32 px-6 py-32">
      <div className="flex flex-col w-full justify-center items-start">
        <div className="flex w-full space-x-4">
          <h1 className="text-[3em] sm:text-[5.75rem] font-bold text-left font-[family-name:var(--font-acorn-bold)]">
            Hi, I'm Alvin
          </h1>
          <div className="flex sm:w-28 sm:h-28 w-16 h-16">
            <Lottie options={helloOptions} />
          </div>
        </div>
        <div className="flex lg:max-w-[80%]">
          <h2 className="text-[1.35em] md:text-[1.5em] font-medium text-left font-[family-name:var(--font-acorn-medium)]">
            An Engineer & Designer , who loves crafting intelligent and beautiful looking things that live on the internet.
          </h2>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex w-full">
          <Lottie options={developerOptions} />
        </div>
      </div>
    </div>
  );
}
