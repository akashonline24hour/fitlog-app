export interface Workout {
  id: string | number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: number; // in minutes
  caloriesBurned: number; // in kcal
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
  isDone?: boolean;
}

export interface PlanContextType {
  todayPlan: Workout[];
  savedPlan: Workout[];
  isLoaded: boolean;
  addToTodayPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleMarkAsDone: (id: string | number) => void;
}
