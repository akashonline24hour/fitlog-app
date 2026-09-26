import React from "react";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col h-full"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <img
          src={workout.image || "/fallback.jpg"}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Muscle Group Tag Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {workout.muscleGroups?.map((group) => (
              <span
                key={group}
                className="bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="font-extrabold text-white text-lg tracking-wide uppercase group-hover:text-[#ccff00] transition">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-xs text-slate-400 mt-1">{workout.equipment}</p>
        </div>

        {/* Spec Stats Row */}
        <div className="flex items-center space-x-4 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-slate-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-slate-400 fill-slate-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
