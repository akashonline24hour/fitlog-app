"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "@/components/home/WorkoutCard";
import { Workout } from "@/types/workout";

type SortOption = "default" | "duration" | "caloriesBurned" | "rating";

interface WorkoutLibraryProps {
  initialWorkouts: Workout[];
}

export default function WorkoutLibrary({
  initialWorkouts,
}: WorkoutLibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedWorkouts = [...initialWorkouts].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // "default" preserves the original API order
  });

  return (
    <section
      id="library"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16"
    >
      {/* Header + Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            THE LIBRARY
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Sort By
          </span>
          <div className="relative inline-block text-left">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#121620] text-slate-200 border border-slate-800 text-xs font-semibold rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3x4 Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
