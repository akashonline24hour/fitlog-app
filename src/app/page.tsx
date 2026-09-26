import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import WorkoutLibrary from "@/components/home/WorkoutLibrary";
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
      <WorkoutLibrary initialWorkouts={workouts} />
    </div>
  );
}
