"use client";

import clsx from "clsx";
import type { ReactElement } from "react";

interface FeaturedProps {
  icon: ReactElement;
  title: string;
  text: string;
}

export function Featured({ icon, title, text }: FeaturedProps) {
  return (
    <div className="border-divider-light relative z-10 flex-1 rounded-2xl border">
      <div className="border-divider-light absolute inset-x-0 inset-y-8 z-[-1] border-t" />
      <div className="border-divider-light absolute inset-y-0 inset-x-8 z-[-1] border-l" />
      <div className="-mt-0.5">
        <div className="mt-4 mr-2 ml-4 flex items-center gap-6 rounded-full">
          <div className="-m-2">{icon}</div>
          <div className="truncate py-2 pr-4 text-sm font-bold">{title}</div>
        </div>
      </div>
      <div className="p-4 pl-12 text-sm">{text}</div>
    </div>
  );
}
