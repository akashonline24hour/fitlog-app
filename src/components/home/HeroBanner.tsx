import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-slate-900/40 border-b border-slate-800/80 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-bold text-[#ccff00] tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide uppercase leading-tight font-sans">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>
            <div className="pt-2">
              <a
                href="#library"
                className="inline-flex items-center space-x-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-[#ccff00]/10"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="w-full md:w-80 flex justify-center">
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800">
              <Image
                src="/images/banner.png"
                alt="FitLog Hero Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
