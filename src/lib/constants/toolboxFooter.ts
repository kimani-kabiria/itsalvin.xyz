import { Icons } from "@/components/icons";

type ToolBoxItem = {
  icon: keyof typeof Icons; // The icon key must be one of the keys in Icons
  label: string;
  href: string; // The URL to open when the item is clicked
};

export const TOOLBOX_FOOT_ITEMS: ToolBoxItem[] = [
    {
      label: "Figma",
      icon: "figma",
      href: "https://www.figma.com/",
    },
    {
      label: "Tailwind",
      icon: "tailwindcss",
      href: "https://tailwindcss.com/",
    },
    {
      label: "Next Js",
      icon: "nextdotjs",
      href: "https://nextjs.org/",
    },
    {
      label: "Vercel",
      icon: "vercel",
      href: "https://vercel.com/",
    }
  ];