import { cn } from "@/lib/utils";
import clsx from "clsx";
import Lottie from "react-lottie";

import Hello from "@/assets/lotties/hello.json";

export function Hero() {
  const helloOptions = {
    loop: true,
    autoplay: true,
    animationData: Hello,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-28 pt-32 justify-center items-center">
      <div className="flex w-full justify-center space-x-4">
        <h1 className="text-[3em] sm:text-[5.75rem] lg:text-[9.75rem] font-bold text-center font-[family-name:var(--font-acorn-bold)]">
          Hi, I'm Alvin
        </h1>
        <div className="flex sm:w-28 sm:h-28 lg:w-48 lg:h-48 w-16 h-16">
          <Lottie options={helloOptions} />
        </div>
      </div>
      <div className="flex justify-center items-center lg:px-64 px-2 lg:max-w-[80%]">
        <h2 className="text-[1.35em] md:text-[1.5em] font-medium text-left md:text-center font-[family-name:var(--font-acorn-medium)]">
          An Engineer & Designer , who loves crafting intelligent and beautiful
          looking things that live on the internet.
        </h2>
      </div>
    </div>
  );
}
