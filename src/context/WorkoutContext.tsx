"use client";

import { IWorkout } from "@/types/workout.type";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Bounce, toast } from "react-toastify";

interface IWorkoutContext {
  planWorkouts: IWorkout[];
  setPlanWorkouts: React.Dispatch<React.SetStateAction<IWorkout[]>>;
  savedWorkouts: IWorkout[];
  setSavedWorkouts: React.Dispatch<React.SetStateAction<IWorkout[]>>;
  completedWorkoutIds: number[];

  addToPlan: (workout: IWorkout) => boolean;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: IWorkout) => boolean;
  removeFromSaved: (id: number) => void;

  toggleComplete: (id: number) => void;

  isCompleted: (id: number) => boolean;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

export const WorkoutContext = createContext<IWorkoutContext>({
  planWorkouts: [],
  setPlanWorkouts: () => { },

  savedWorkouts: [],
  setSavedWorkouts: () => { },

  completedWorkoutIds: [],

  addToPlan: () => false,
  removeFromPlan: () => { },

  addToSaved: () => false,
  removeFromSaved: () => { },

  toggleComplete: () => { },

  isCompleted: () => false,
  isInPlan: () => false,
  isInSaved: () => false,
});

export const useWorkout = () => useContext(WorkoutContext);

const PLAN_STORAGE_KEY = "fitlog_today_plan";
const SAVED_STORAGE_KEY = "fitlog_saved";
const COMPLETED_STORAGE_KEY = "fitlog_completed";

export const WorkoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [planWorkouts, setPlanWorkouts] = useState<IWorkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[]>([]);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const savedList = localStorage.getItem(SAVED_STORAGE_KEY);
      const savedCompleted = localStorage.getItem(
        COMPLETED_STORAGE_KEY
      );

      if (savedPlan) {
        const parsed = JSON.parse(savedPlan);

        queueMicrotask(() => {
          setPlanWorkouts(parsed);

          const planEl = document.getElementById(
            "navbar-plan-count"
          );

          if (planEl) {
            planEl.textContent = String(parsed.length);
          }

          const planMobileEl = document.getElementById(
            "navbar-plan-count-mobile"
          );

          if (planMobileEl) {
            planMobileEl.textContent = String(parsed.length);
          }
        });
      }

      if (savedList) {
        const parsed = JSON.parse(savedList);

        queueMicrotask(() => {
          setSavedWorkouts(parsed);

          const savedEl = document.getElementById(
            "navbar-saved-count"
          );

          if (savedEl) {
            savedEl.textContent = String(parsed.length);
          }
        });
      }

      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted);

        queueMicrotask(() => {
          setCompletedWorkoutIds(parsed);
        });
      }
    } catch (error) {
      console.error(
        "Failed to load workouts from localStorage",
        error
      );
    } finally {
      queueMicrotask(() => {
        setIsHydrated(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      localStorage.setItem(
        PLAN_STORAGE_KEY,
        JSON.stringify(planWorkouts)
      );

      const planEl = document.getElementById(
        "navbar-plan-count"
      );

      if (planEl) {
        planEl.textContent = String(planWorkouts.length);
      }

      const planMobileEl = document.getElementById(
        "navbar-plan-count-mobile"
      );

      if (planMobileEl) {
        planMobileEl.textContent = String(planWorkouts.length);
      }
    } catch (error) {
      console.error(
        "Failed to save planWorkouts to localStorage",
        error
      );
    }
  }, [planWorkouts, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(savedWorkouts)
      );

      const savedEl = document.getElementById(
        "navbar-saved-count"
      );

      if (savedEl) {
        savedEl.textContent = String(savedWorkouts.length);
      }
    } catch (error) {
      console.error(
        "Failed to save savedWorkouts to localStorage",
        error
      );
    }
  }, [savedWorkouts, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      localStorage.setItem(
        COMPLETED_STORAGE_KEY,
        JSON.stringify(completedWorkoutIds)
      );
    } catch (error) {
      console.error(
        "Failed to save completedWorkoutIds to localStorage",
        error
      );
    }
  }, [completedWorkoutIds, isHydrated]);

  const isInPlan = (id: number) => {
    return planWorkouts.some((item) => item.id === id);
  };

  const isInSaved = (id: number) => {
    return savedWorkouts.some((item) => item.id === id);
  };

  const isCompleted = (id: number) => {
    return completedWorkoutIds.includes(id);
  };

  const addToPlan = (workout: IWorkout): boolean => {
    if (isInPlan(workout.id)) {
      toast.info(
        `"${workout.name}" is already in today's plan!`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        }
      );

      return false;
    }

    if (planWorkouts.length >= 5) {
      toast.warning(
        "Cap of five lifts reached for today! Finish them first.",
        {
          position: "top-right",
          autoClose: 3500,
          theme: "dark",
          transition: Bounce,
        }
      );

      return false;
    }

    setPlanWorkouts((prev) => [...prev, workout]);

    toast.success(
      `Added "${workout.name}" to today's plan!`,
      {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      }
    );

    return true;
  };

  const removeFromPlan = (id: number) => {
    const item = planWorkouts.find((workout) => workout.id === id);

    setPlanWorkouts((prev) =>
      prev.filter((workout) => workout.id !== id)
    );

    setCompletedWorkoutIds((prev) =>
      prev.filter((completedId) => completedId !== id)
    );

    toast.info(
      `Removed "${item?.name || "Workout"}" from today's plan.`,
      {
        position: "top-right",
        autoClose: 2500,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  const addToSaved = (workout: IWorkout): boolean => {
    if (isInSaved(workout.id)) {
      toast.info(
        `"${workout.name}" is already in your saved list!`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        }
      );

      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);

    toast.success(
      `Saved "${workout.name}" for later!`,
      {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      }
    );

    return true;
  };

  const removeFromSaved = (id: number) => {
    const item = savedWorkouts.find(
      (workout) => workout.id === id
    );

    setSavedWorkouts((prev) =>
      prev.filter((workout) => workout.id !== id)
    );

    toast.info(
      `Removed "${item?.name || "Workout"}" from saved.`,
      {
        position: "top-right",
        autoClose: 2500,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  const toggleComplete = (id: number) => {
    const item = planWorkouts.find(
      (workout) => workout.id === id
    );

    if (completedWorkoutIds.includes(id)) {
      setCompletedWorkoutIds((prev) =>
        prev.filter((completedId) => completedId !== id)
      );

      toast.info(
        `Marked "${item?.name || "Workout"}" as in-progress.`,
        {
          position: "top-right",
          autoClose: 2500,
          theme: "dark",
          transition: Bounce,
        }
      );
    } else {
      setCompletedWorkoutIds((prev) => [...prev, id]);

      toast.success(
        `Completed "${item?.name || "Workout"}"! Great work 💪`,
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };

  const sharedData = {
    planWorkouts,
    setPlanWorkouts,

    savedWorkouts,
    setSavedWorkouts,

    completedWorkoutIds,

    addToPlan,
    removeFromPlan,

    addToSaved,
    removeFromSaved,

    toggleComplete,

    isCompleted,
    isInPlan,
    isInSaved,
  };

  return (
    <WorkoutContext.Provider value={sharedData}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;