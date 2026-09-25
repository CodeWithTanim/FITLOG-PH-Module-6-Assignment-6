"use client";

import PlannedWorkoutCard from "@/components/shared/PlannedWorkoutCard";
import { WorkoutContext } from "@/context/WorkoutContext";
import { IWorkout } from "@/types/workout.type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";

const MyPlanContent = () => {
    const { planWorkouts, savedWorkouts } = useContext(WorkoutContext);
    const searchParams = useSearchParams();
    const tabQuery = searchParams.get("tab");

    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
        "duration",
    );

    useEffect(() => {
        if (tabQuery === "saved") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab("saved");
        } else if (tabQuery === "plan") {
            setActiveTab("plan");
        }
    }, [tabQuery]);

    const sortWorkouts = (workouts: IWorkout[]) => {
        const sorted = [...workouts];
        if (sortBy === "duration") {
            sorted.sort((a, b) => b.duration - a.duration);
        } else if (sortBy === "calories") {
            sorted.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
        } else if (sortBy === "rating") {
            sorted.sort((a, b) => b.rating - a.rating);
        }
        return sorted;
    };

    const sortedPlanWorkouts = sortWorkouts(planWorkouts);
    const sortedSavedWorkouts = sortWorkouts(savedWorkouts);

    // Live Metrics summary based on active tab
    const currentWorkouts = activeTab === "plan" ? planWorkouts : savedWorkouts;
    const totalExercises = currentWorkouts.length;
    const totalMinutes = currentWorkouts.reduce(
        (sum, workout) => sum + (workout.duration || 0),
        0,
    );
    const totalCalories = currentWorkouts.reduce(
        (sum, workout) => sum + (workout.caloriesBurned || 0),
        0,
    );

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12">
            {/* Title Header */}
            <div>
                <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                    MY PLAN
                </h1>
                <p className="mt-2 text-sm sm:text-base text-zinc-400">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* Metrics Summary Row */}
            <div className="my-8 overflow-hidden rounded-2xl border border-[#1E232E] bg-[#12151B] p-6 shadow-xl shadow-black/40">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-[#1E232E]">
                    <div className="sm:pr-6">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-400">
                            Exercises
                        </span>
                        <p className="font-display mt-2 text-4xl sm:text-5xl font-black text-[#CCFF00]">
                            {totalExercises}
                        </p>
                    </div>

                    <div className="sm:px-6">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-400">
                            Minutes
                        </span>
                        <p className="font-display mt-2 text-4xl sm:text-5xl font-black text-white">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="sm:pl-6">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-400">
                            Calories
                        </span>
                        <p className="font-display mt-2 text-4xl sm:text-5xl font-black text-white">
                            {totalCalories}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs and Sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Tab switch */}
                <div className="inline-flex rounded-xl border border-[#1E232E] bg-[#12151B] p-1">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`rounded-lg px-5 py-2 text-xs sm:text-sm font-bold transition-all ${activeTab === "plan"
                                ? "bg-[#202735] text-white shadow-sm"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`rounded-lg px-5 py-2 text-xs sm:text-sm font-bold transition-all ${activeTab === "saved"
                                ? "bg-[#202735] text-white shadow-sm"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort By Select */}
                <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-zinc-400">
                        Sort By
                    </span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as "duration" | "calories" | "rating")
                            }
                            className="appearance-none rounded-xl border border-[#202735] bg-[#12151B] py-2 pl-4 pr-9 text-xs sm:text-sm font-semibold text-white focus:border-[#CCFF00] focus:outline-none cursor-pointer"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                        <div className="pointer-events-none absolute right-3 top-2.5 text-zinc-400">
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
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab content list */}
            <div className="mt-6">
                {activeTab === "plan" ? (
                    sortedPlanWorkouts.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {sortedPlanWorkouts.map((workout: IWorkout) => (
                                <PlannedWorkoutCard
                                    key={workout.id}
                                    workout={workout}
                                    isPlanTab={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-[#1E232E] bg-[#0E1015]/40 px-6 py-20 sm:py-28 text-center">
                            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                                NOTHING HERE YET
                            </h2>
                            <p className="mt-2 text-sm sm:text-base text-zinc-400">
                                Browse the library and add a lift to get today moving.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-8 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-[#b8e600] active:scale-95 shadow-lg shadow-[#ccff00]/15"
                            >
                                Go to workouts
                            </Link>
                        </div>
                    )
                ) : sortedSavedWorkouts.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {sortedSavedWorkouts.map((workout: IWorkout) => (
                            <PlannedWorkoutCard
                                key={workout.id}
                                workout={workout}
                                isPlanTab={false}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border-2 border-dashed border-[#1E232E] bg-[#0E1015]/40 px-6 py-20 sm:py-28 text-center">
                        <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                            NOTHING HERE YET
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-zinc-400">
                            Browse the library and save lifts to train later.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-8 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-[#b8e600] active:scale-95 shadow-lg shadow-[#ccff00]/15"
                        >
                            Go to workouts
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const MyPlan = () => {
    return (
        <Suspense fallback={null}>
            <MyPlanContent />
        </Suspense>
    );
};

export default MyPlan;
