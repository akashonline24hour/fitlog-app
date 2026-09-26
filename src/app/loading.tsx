import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
        Loading FitLog...
      </p>
    </div>
  );
}
