/**
 *
 * This file defines the root layout for the entire application. It wraps all
 * pages with shared UI elements, including the navigation bar, main content
 * container, and footer. Global styling such as the dark theme, gradient
 * background, and base font settings are applied here to ensure visual
 * consistency across the app.
 */


import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NBA 2K Inspired Stats",
  description: "Real-time NBA statistics with 2K-style interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gradient-to-b from-gray-900 to-black text-white min-h-screen`}
      >
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              NBA 2K Inspired Stats • Data from ESPN & BallDontLie APIs • By
              Xander Rancap
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This is a project. All NBA team and player names are property of
              the NBA.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
