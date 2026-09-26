import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import WorkoutCard from "@/components/home/WorkoutCard";
import { Workout } from "@/types/workout";

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch workouts data");
  }
  return res.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 pb-20">
      <HeroBanner />

      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16"
      >
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            THE LIBRARY
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* 3x4 Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  );
}
