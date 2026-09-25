"use client";

import { IWorkout } from "@/types/workout.type";
import React, { useEffect, useState } from "react";
import WorkoutCard from "../shared/WorkoutCard";

const getWorkouts = async (): Promise<IWorkout[]> => {
    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!res.ok) {
            throw new Error("Failed to fetch workouts");
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching workouts data:", error);
        return [];
    }
};

const Library = () => {
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWorkouts = async () => {
            setLoading(true);

            const data = await getWorkouts();

            setWorkouts(data);
            setLoading(false);
        };

        loadWorkouts();
    }, []);

    return (
        <section
            id="library"
            className="scroll-mt-24 pb-16"
        >
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div>
                    <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-75 items-center justify-center">
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <span className="loading loading-spinner text-[#CCFF00]" />
                            <span>Loading workouts...</span>
                        </div>
                    </div>
                )}

                {/* Workout Grid */}
                {!loading && workouts.length > 0 && (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {workouts.map((workout) => (
                            <WorkoutCard
                                key={workout.id}
                                workout={workout}
                            />
                        ))}
                    </div>
                )}

                {/* API Error / Empty */}
                {!loading && workouts.length === 0 && (
                    <div className="flex min-h-75 items-center justify-center">
                        <p className="text-sm text-zinc-500">
                            No workouts available.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Library;