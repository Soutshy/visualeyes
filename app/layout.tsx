import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RightClickProtector } from "@/components/RightClickProtector";
import { TransitionProvider } from "@/components/TransitionContext";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Visual Eyes | Dark Luxury Photography",
  description: "Visual Eyes - Premium Photography Agency. Capturing moments with an artistic vision.",
  keywords: ["photography", "luxury", "visual", "art", "portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${manrope.variable} antialiased bg-rich-black text-off-white`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Preloader />
          <TransitionProvider>
            <Navbar />
            <RightClickProtector />
            {children}
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
