"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FitLog Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
        <span className="text-3xl">⚠️</span>
      </div>
      <h2 className="text-xl font-extrabold text-white uppercase tracking-wide">
        Failed to load workouts
      </h2>
      <p className="text-slate-400 text-xs max-w-md">
        Could not connect to the API server. Please check your connection or try
        again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs px-6 py-2.5 rounded-xl transition"
      >
        Try Again
      </button>
    </div>
  );
}
