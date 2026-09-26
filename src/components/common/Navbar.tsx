"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedPlan } = usePlan();

  return (
    <nav className="bg-[#0e1117] border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo Image */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:opacity-90 transition"
        >
          <Image
            src="/images/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
          <span className="font-extrabold text-xl tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2 bg-slate-900/60 p-1 rounded-full border border-slate-800">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              pathname === "/"
                ? "bg-[#ccff00] text-black font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              pathname === "/my-plan"
                ? "bg-[#ccff00] text-black font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Status Counter Badges */}
        <div className="flex items-center space-x-3">
          <Link
            href="/my-plan"
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <span>Saved</span>
            <span className="border border-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold text-[11px]">
              {savedPlan.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
