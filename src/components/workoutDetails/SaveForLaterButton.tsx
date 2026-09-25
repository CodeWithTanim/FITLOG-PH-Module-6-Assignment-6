"use client";

import { WorkoutContext } from "@/context/WorkoutContext";
import { IWorkout } from "@/types/workout.type";
import React, { useContext } from "react";
import { FiBookmark } from "react-icons/fi";

interface ISaveForLaterButtonProps {
  workout: IWorkout;
}

const SaveForLaterButton = ({
  workout,
}: ISaveForLaterButtonProps) => {
  const { addToSaved, isInSaved } =
    useContext(WorkoutContext);

  const saved = isInSaved(workout.id);

  const handleSaveForLater = () => {
    addToSaved(workout);
  };

  return (
    <button
      onClick={handleSaveForLater}
      disabled={saved}
      className={`flex items-center justify-center gap-2.5 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all ${saved
        ? "cursor-not-allowed border-[#2C3545] bg-[#161B24] text-zinc-400 opacity-90"
        : "border-[#262F3F] bg-[#12161F] text-white shadow-md shadow-black/30 hover:border-zinc-500 hover:bg-[#181E2A] active:scale-95"
        }`}
    >
      <FiBookmark
        className={`h-4 w-4 ${saved
          ? "fill-current text-[#CCFF00]"
          : "text-current"
          }`}
        strokeWidth={2}
      />

      <span>
        {saved ? "Saved for later" : "Save for later"}
      </span>
    </button>
  );
};

export default SaveForLaterButton;