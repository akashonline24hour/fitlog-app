'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { Workout, PlanContextType } from '@/types/workout';

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedPlan, setSavedPlan] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('fitlog_today_plan');
      const storedSaved = localStorage.getItem('fitlog_saved_plan');
      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedPlan(JSON.parse(storedSaved));
    } catch (e) {
      console.error('Error reading localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state to localStorage whenever plans update
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
      localStorage.setItem('fitlog_saved_plan', JSON.stringify(savedPlan));
    }
  }, [todayPlan, savedPlan, isLoaded]);

  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already in Today's Plan!`);
      return;
    }
    if (todayPlan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today! Finish one first.");
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success(`Added ${workout.name} to Today's Plan!`);
  };

  const addToSaved = (workout: Workout) => {
    if (savedPlan.some((item) => item.id === workout.id)) {
      toast.error(`${workout.name} is already in Saved!`);
      return;
    }
    setSavedPlan((prev) => [...prev, workout]);
    toast.success(`Saved ${workout.name} for later!`);
  };

  const removeFromPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast('Removed from Today\'s Plan', { icon: '🗑️' });
  };

  const removeFromSaved = (id: string | number) => {
    setSavedPlan((prev) => prev.filter((item) => item.id !== id));
    toast('Removed from Saved', { icon: '🗑️' });
  };

  const toggleMarkAsDone = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isDone;
          toast.success(nextState ? 'Workout completed! 💪' : 'Workout marked pending');
          return { ...item, isDone: nextState };
        }
        return item;
      })
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        isLoaded,
        addToTodayPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};