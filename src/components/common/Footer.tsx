import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0b0e14] border-t border-slate-800/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:opacity-90 transition"
        >
          <Image
            src="/images/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-extrabold text-base tracking-wider text-white">
            FITLOG
          </span>
        </Link>
        <p className="text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
