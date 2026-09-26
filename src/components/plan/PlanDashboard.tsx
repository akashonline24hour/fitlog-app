"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Flame, Star, ChevronDown, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function PlanDashboard() {
  const {
    todayPlan,
    savedPlan,
    removeFromPlan,
    removeFromSaved,
    toggleMarkAsDone,
    addToTodayPlan,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<string>("rating");

  // Dynamically select list based on active tab
  const currentList = activeTab === "today" ? todayPlan : savedPlan;

  // Calculate stats dynamically for the active tab view
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce(
    (acc, curr) => acc + (curr.duration || 0),
    0,
  );
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + (curr.caloriesBurned || 0),
    0,
  );

  // Apply sorting
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "calories")
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-wider uppercase">
          MY PLAN
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* DYNAMIC STATS DASHBOARD CARD */}
      <div className="bg-[#121620] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 font-medium">Exercises</span>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#ccff00]">
            {totalExercises}
          </p>
        </div>
        <div className="space-y-1 border-l border-slate-800/80 pl-6">
          <span className="text-xs text-slate-400 font-medium">Minutes</span>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            {totalMinutes}
          </p>
        </div>
        <div className="space-y-1 border-l border-slate-800/80 pl-6">
          <span className="text-xs text-slate-400 font-medium">Calories</span>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            {totalCalories}
          </p>
        </div>
      </div>

      {/* CONTROLS: TABS & SORT BY */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* TAB TOGGLE */}
        <div className="inline-flex bg-[#121620] p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "today"
                ? "bg-[#ccff00] text-black shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Saved
          </button>
        </div>

        {/* SORT BY DROPDOWN */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#121620] border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2 pr-8 font-semibold focus:outline-none focus:border-slate-700 cursor-pointer"
            >
              <option value="rating">Rating</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="name">Name</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* WORKOUT LIST CONTENT OR EMPTY STATE */}
      {sortedList.length === 0 ? (
        <div className="border border-dashed border-slate-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center space-y-3 bg-[#0d1017]/50">
          <h3 className="text-lg font-extrabold text-white uppercase tracking-wider">
            {activeTab === "today"
              ? "NO EXERCISES IN TODAY’S PLAN"
              : "NO SAVED EXERCISES"}
          </h3>
          <p className="text-slate-400 text-xs max-w-sm">
            {activeTab === "today"
              ? "Browse the workout library or saved list to add exercises for today."
              : "Save workouts from the library to quickly access them later."}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs px-6 py-3 rounded-full transition shadow-lg shadow-[#ccff00]/10"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl border bg-[#121620] gap-4 transition ${
                workout.isDone && activeTab === "today"
                  ? "border-slate-800/50 opacity-60"
                  : "border-slate-800/80"
              }`}
            >
              {/* Left Side: Thumbnail + Info */}
              <div className="flex items-center space-x-4">
                <div className="relative w-28 h-18 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={workout.image || "/images/banner.png"}
                    alt={workout.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3
                    className={`font-extrabold text-white text-base tracking-wide uppercase ${
                      workout.isDone && activeTab === "today"
                        ? "line-through text-slate-400"
                        : ""
                    }`}
                  >
                    {workout.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {workout.equipment}
                  </p>

                  {/* Spec Row */}
                  <div className="flex items-center space-x-3 text-xs text-slate-300 mt-2 font-medium">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>{workout.duration} min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </span>
                    {workout.rating && (
                      <span className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                        <span>{workout.rating}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Action Buttons */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="px-4 py-2 rounded-full border border-slate-700/80 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
                >
                  View Details
                </Link>

                {activeTab === "today" ? (
                  <button
                    onClick={() => toggleMarkAsDone(workout.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center space-x-1.5 ${
                      workout.isDone
                        ? "bg-slate-800 text-slate-300 border border-slate-700"
                        : "bg-[#ccff00] hover:bg-[#b8e600] text-black"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{workout.isDone ? "Completed" : "Mark as Done"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => addToTodayPlan(workout)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-[#ccff00] hover:bg-[#b8e600] text-black transition"
                  >
                    Add to Today
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="text-slate-500 hover:text-slate-200 p-1.5 transition ml-1"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
