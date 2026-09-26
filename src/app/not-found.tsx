import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <h1 className="text-6xl font-extrabold text-[#ccff00]">404</h1>
      <h2 className="text-xl font-extrabold text-white uppercase tracking-wide">
        Page Not Found
      </h2>
      <p className="text-slate-400 text-xs max-w-sm">
        The lift or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs px-6 py-2.5 rounded-xl transition"
      >
        Return Home
      </Link>
    </div>
  );
}
