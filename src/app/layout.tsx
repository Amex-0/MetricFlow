import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metric Flow",
  description: "Analytics",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body >
        <Navbar/> 
        <div className="flex">
        <div className="h-[100vh] w-100">
          <Sidebar/>
        </div>
        <div className="p-5 w-full md:max-w-[1140px] bg-slate-200 dark:bg-slate-900">
        {children}
        </div>
        </div>
        </body>
    </html>
  );
}
