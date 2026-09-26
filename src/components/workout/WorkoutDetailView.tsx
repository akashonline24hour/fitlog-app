"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Bookmark, ArrowLeft } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

interface WorkoutDetailViewProps {
  workout: Workout;
}

export default function WorkoutDetailView({ workout }: WorkoutDetailViewProps) {
  const { addToTodayPlan, addToSaved } = usePlan();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column — Exercise Artwork */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#121620] border border-slate-800">
          <Image
            src={workout.image || "/images/banner.png"}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column — Details & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">
              {workout.name}
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-[#121620] border border-slate-800 rounded-xl divide-y divide-slate-800/80 text-sm">
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">EQUIPMENT</span>
              <span className="font-semibold text-slate-200">
                {workout.equipment}
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">DIFFICULTY</span>
              <span className="font-semibold text-slate-200">
                {workout.difficulty}
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">SETS</span>
              <span className="font-semibold text-slate-200">
                {workout.sets}
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">REPS</span>
              <span className="font-semibold text-slate-200">
                {workout.reps}
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">DURATION</span>
              <span className="font-semibold text-slate-200">
                {workout.duration} min
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">CALORIES</span>
              <span className="font-semibold text-slate-200">
                {workout.caloriesBurned} kcal
              </span>
            </div>
            <div className="flex justify-between p-3.5">
              <span className="text-slate-400">RATING</span>
              <span className="font-semibold text-slate-200">
                {workout.rating}
              </span>
            </div>
          </div>

          {/* Instructions List */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside leading-relaxed">
              {workout.instructions?.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => addToTodayPlan(workout)}
              className="flex-1 min-w-[200px] inline-flex items-center justify-center space-x-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-3.5 rounded-xl transition"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Add to today's plan</span>
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="inline-flex items-center justify-center space-x-2 bg-[#121620] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl transition"
            >
              <Bookmark className="w-5 h-5" />
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
