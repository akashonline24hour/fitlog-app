"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WorkoutDetailView from "@/components/workout/WorkoutDetailView";
import { Workout } from "@/types/workout";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch detail");
        const data = await res.json();
        setWorkout(data);
      } catch (e) {
        console.error("Error fetching detail:", e);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        <div className="animate-pulse text-center">
          <p className="text-lg font-semibold">Loading workout details...</p>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        <p className="text-lg font-semibold">Workout not found.</p>
      </div>
    );
  }

  return <WorkoutDetailView workout={workout} />;
}
