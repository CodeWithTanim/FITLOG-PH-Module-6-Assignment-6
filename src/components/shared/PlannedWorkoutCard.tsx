"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { IWorkout } from "@/types/workout.type";
import { WorkoutContext } from "@/context/WorkoutContext";

interface IPlannedWorkoutCardProps {
    workout: IWorkout;
    isPlanTab?: boolean;
}

const PlannedWorkoutCard = ({
    workout,
    isPlanTab = true,
}: IPlannedWorkoutCardProps) => {
    const {
        removeFromPlan,
        removeFromSaved,
        addToPlan,
        toggleComplete,
        isCompleted,
    } = useContext(WorkoutContext);

    const completed = isCompleted(workout.id);

    const handleToggleComplete = () => {
        console.log("clicked mark as done button", workout.name);
        toggleComplete(workout.id);
    };

    const handleRemove = () => {
        console.log("clicked remove button", workout.name);
        if (isPlanTab) {
            removeFromPlan(workout.id);
        } else {
            removeFromSaved(workout.id);
        }
    };

    const handleAddToPlan = () => {
        console.log("clicked add to plan from saved", workout.name);
        addToPlan(workout);
    };

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border bg-[#13161C] p-4 sm:p-5 transition-all ${completed && isPlanTab
                ? "border-emerald-500/40 bg-[#101915]"
                : "border-[#1E232E] hover:border-[#2C3545]"
                }`}
        >
            {/* Thumbnail & Info */}
            <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative h-20 w-32 sm:h-24 sm:w-44 shrink-0 overflow-hidden rounded-xl bg-[#1A1F2A]">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 176px"
                    />
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <h3
                            className={`font-display text-base sm:text-xl font-bold uppercase tracking-tight ${completed && isPlanTab
                                ? "text-zinc-400 line-through"
                                : "text-white"
                                }`}
                        >
                            {workout.name}
                        </h3>
                        {completed && isPlanTab && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                                DONE
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-xs text-zinc-400">{workout.equipment}</p>

                    {/* Stats Row */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5">
                            <svg
                                className="h-3.5 w-3.5 text-zinc-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <polyline
                                    points="12 6 12 12 16 14"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span>{workout.duration} min</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <svg
                                className="h-3.5 w-3.5 text-amber-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2c.5 2.5-.5 4.5-2 6-1.5 1.5-2.5 3.5-2.5 6 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-4.5-4-8-4-8s-.5 2-2 3c-.5-1.5-.5-4-2.5-7z" />
                            </svg>
                            <span>{workout.caloriesBurned} kcal</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <svg
                                className="h-3.5 w-3.5 text-yellow-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                            </svg>
                            <span>{workout.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
                <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-zinc-700 bg-transparent px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white transition hover:border-zinc-400 hover:bg-zinc-800"
                >
                    View Details
                </Link>

                {isPlanTab ? (
                    <button
                        onClick={handleToggleComplete}
                        className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-black transition-all active:scale-95 ${completed
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-[#CCFF00] text-black hover:bg-[#b8e600] shadow-sm shadow-[#ccff00]/10"
                            }`}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>{completed ? "Completed" : "Mark as Done"}</span>
                    </button>
                ) : (
                    <button
                        onClick={handleAddToPlan}
                        className="rounded-full bg-[#CCFF00] px-4 sm:px-5 py-2 text-xs sm:text-sm font-black text-black transition hover:bg-[#b8e600] active:scale-95"
                    >
                        Add to Plan
                    </button>
                )}

                <button
                    onClick={handleRemove}
                    title={isPlanTab ? "Remove from Plan" : "Remove from Saved"}
                    aria-label="Remove workout"
                    className="rounded-full border border-[#222938] bg-[#141822] p-2 text-zinc-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PlannedWorkoutCard;
