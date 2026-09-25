"use client";

import { WorkoutContext } from "@/context/WorkoutContext";
import { IWorkout } from "@/types/workout.type";
import React, { useContext } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

interface IAddToPlanButtonProps {
  workout: IWorkout;
}

const AddToPlanButton = ({ workout }: IAddToPlanButtonProps) => {
  const { addToPlan, isInPlan, planWorkouts } = useContext(WorkoutContext);

  const added = isInPlan(workout.id);
  const isCapReached = planWorkouts.length >= 5;

  const handleAddToPlan = () => {
    addToPlan(workout);
  };

  return (
    <button
      onClick={handleAddToPlan}
      disabled={added}
      className={`flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-black transition-all ${added
          ? "cursor-not-allowed border border-[#3E5224] bg-[#222B1E] text-[#CCFF00] opacity-90"
          : isCapReached
            ? "bg-[#CCFF00]/80 text-black shadow-md shadow-[#ccff00]/10 hover:bg-[#CCFF00] active:scale-95"
            : "bg-[#CCFF00] text-black shadow-lg shadow-[#ccff00]/15 hover:bg-[#b8e600] active:scale-95"
        }`}
    >
      {added ? (
        <FiCheckSquare className="h-4 w-4" strokeWidth={2.5} />
      ) : (
        <FiSquare className="h-4 w-4" strokeWidth={2.5} />
      )}

      <span>{added ? "In Today's Plan" : "Add to today's plan"}</span>
    </button>
  );
};

export default AddToPlanButton;
