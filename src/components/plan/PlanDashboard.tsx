"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, CheckCircle2, Circle, ChevronDown, Plus } from "lucide-react";
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

  // Calculate stats
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (acc, curr) => acc + (curr.duration || 0),
    0,
  );
  const totalCalories = todayPlan.reduce(
    (acc, curr) => acc + (curr.caloriesBurned || 0),
    0,
  );

  // Active list selection
  const currentList = activeTab === "today" ? todayPlan : savedPlan;

  // Apply sorting
  const sortedList = [...currentList].sort((a, b) => {
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

      {/* STATS DASHBOARD CARD */}
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
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === "today"
                ? "bg-slate-800 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-slate-800 text-white shadow"
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
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="name">Name</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* WORKOUT LIST CONTENT OR EMPTY CONTAINER */}
      {sortedList.length === 0 ? (
        <div className="border border-dashed border-slate-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center space-y-3 bg-[#0d1017]/50">
          <h3 className="text-lg font-extrabold text-white uppercase tracking-wider">
            NOTHING HERE YET
          </h3>
          <p className="text-slate-400 text-xs max-w-sm">
            Browse the library and add a lift to get today moving.
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
        <div className="space-y-3">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className={`flex items-center justify-between p-4 rounded-xl border bg-[#121620] transition ${
                workout.isDone
                  ? "border-slate-800/50 opacity-60"
                  : "border-slate-800"
              }`}
            >
              <div className="flex items-center space-x-4">
                {activeTab === "today" && (
                  <button
                    onClick={() => toggleMarkAsDone(workout.id)}
                    className="text-slate-400 hover:text-[#ccff00] transition"
                  >
                    {workout.isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-[#ccff00]" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                )}
                <div>
                  <h3
                    className={`font-bold text-white text-base ${
                      workout.isDone ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {workout.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {workout.sets} sets × {workout.reps} reps •{" "}
                    {workout.duration} min • {workout.caloriesBurned} kcal
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {activeTab === "saved" && (
                  <button
                    onClick={() => addToTodayPlan(workout)}
                    className="p-2 bg-[#ccff00]/10 hover:bg-[#ccff00]/20 text-[#ccff00] rounded-lg text-xs font-bold transition flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                )}
                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="text-slate-500 hover:text-red-400 p-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
