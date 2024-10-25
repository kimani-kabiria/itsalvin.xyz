"use client";

import { TimeBarThemeSwitcher } from "./TimeBar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

import { TOOLBOX_FOOT_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <div className="flex flex-col w-full px-4 py-4 bottom-1 mx-auto justify-center items-center">
      <div className="flex flex-col justify-center items-center py-8 space-y-2">
        <p className="text-xl text-center font-[family-name:var(--font-acorn-medium)]">
          This site was crafted with plenty cups of ☕
        </p>
        <p className="text-xl font-[family-name:var(--font-acorn-medium)]">
          and using the following tools:
        </p>
        <div className="flex flex-row space-x-3 py-3">
          {TOOLBOX_FOOT_ITEMS.map((item) => {
            const Icon = Icons[item.icon || "arrowRight"];
            return (
              <>
                <Tooltip>
                  <TooltipTrigger>
                    <Icon className={`size-8 text-duka-green`} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </>
            );
          })}
        </div>
      </div>
      <div className="py-2">
        <p className="font-[family-name:var(--font-acorn-regular)]">
          &copy; {new Date().getFullYear()} Alvin Kimani. All rights reserved.
        </p>
      </div>
      <TimeBarThemeSwitcher />
    </div>
  );
}
