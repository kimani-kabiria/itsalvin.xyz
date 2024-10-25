import type { Metadata } from "next";
import "./globals.css";
import { NavBarDock, Footer } from "@/components/layout";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const acornBold = localFont({
  src: "./fonts/Acorn-Bold.woff",
  variable: "--font-acorn-bold",
  weight: "700",
});

const acornRegular = localFont({
  src: "./fonts/Acorn-Regular.woff",
  variable: "--font-acorn-regular",
  weight: "400",
});

const acornLight = localFont({
  src: "./fonts/Acorn-Light.woff",
  variable: "--font-acorn-light",
  weight: "300",
});

const acornMedium = localFont({
  src: "./fonts/Acorn-Medium.woff",
  variable: "--font-acorn-medium",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Hi👋, its Alvin",
  description: "This is my portfolio.",
  // SEO optimization
  openGraph: {
    title: "Hi👋, its Alvin",
    description: "This is my portfolio.",
    url: "https://myawesomeapp.com", // Your website URL
    type: "website",
    images: [
      {
        url: "https://myawesomeapp.com/og-image.png", // Path to your Open Graph image
        width: 1200,
        height: 630,
        alt: "Hi👋, its Alvin Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Hi👋, its Alvin",
    description: "This is my portfolio.",
    image: "https://myawesomeapp.com/twitter-image.png", // Path to your Twitter card image
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  keywords: "Next.js, SEO, Web Development, Awesome App",
};;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex flex-col font-sans antialiased", fontSans.variable, acornBold.variable, acornMedium.variable, acornRegular.variable)}>
        <main
          className={clsx(
            "background-grid background-grid--fade-out border-divider-light z-[900]",
            "scrollbar-hide"
          )}
        >
          <ThemeProvider attribute="class">
            <TooltipProvider delayDuration={0}>
              {children}
              <Footer />
              <NavBarDock />
            </TooltipProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
