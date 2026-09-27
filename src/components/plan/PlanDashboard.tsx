"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Clock,
  Flame,
  Star,
  ChevronDown,
  X,
  ArrowUpDown,
} from "lucide-react";
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
  const [sortBy, setSortBy] = useState<string>("duration");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "duration", label: "Duration" },
    { value: "calories", label: "Calories" },
    { value: "rating", label: "Rating" },
  ];
  const activeSortLabel =
    sortOptions.find((o) => o.value === sortBy)?.label ?? "Sort";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "calories")
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
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
        <div
          className="flex items-center bg-[#121620] border border-slate-800/80 rounded-full pl-4 pr-1.5 py-1.5 text-xs shadow-sm relative"
          ref={sortRef}
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 mr-2" />
          <span className="text-slate-400 font-semibold mr-3 hidden sm:inline">
            Sort By
          </span>

          <button
            type="button"
            onClick={() => setSortOpen((o) => !o)}
            className={`flex items-center justify-between gap-2 bg-[#0d1017] border text-slate-100 text-xs rounded-full pl-4 pr-3 py-1.5 font-bold tracking-wide transition-all duration-150 cursor-pointer min-w-[104px] ${
              sortOpen
                ? "border-[#ccff00]/60 ring-2 ring-[#ccff00]/40"
                : "border-slate-800/60 hover:border-slate-700 hover:bg-[#171c26]"
            }`}
          >
            <span>{activeSortLabel}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#ccff00] transition-transform duration-150 ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {sortOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-[#121620] border border-slate-800/80 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-20 py-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition ${
                    sortBy === opt.value
                      ? "bg-[#ccff00] text-black"
                      : "text-slate-300 hover:bg-slate-800/70"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
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
