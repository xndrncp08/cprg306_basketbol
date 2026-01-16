/**
 *
 * This component provides the main navigation bar for the application. It
 * supports both desktop and mobile layouts, highlighting the active route
 * and displaying a collapsible hamburger menu on smaller screens. Navigation
 * is handled using Next.js client-side routing for fast transitions.
 */


"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaNewspaper,
  FaUsers,
  FaTrophy,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/news", label: "News", icon: <FaNewspaper /> },
    { href: "/players", label: "Players", icon: <FaUsers /> },
    { href: "/standings", label: "Standings", icon: <FaTrophy /> },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-purple-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent"
          >
            NBA 2K Stats
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                  isActive(item.href)
                    ? "bg-purple-800 text-white hover:bg-purple-900"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg flex items-center ${
                    isActive(item.href)
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
