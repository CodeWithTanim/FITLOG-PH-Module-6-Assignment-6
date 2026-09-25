import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IWorkout } from "@/types/workout.type";
import AddToPlanButton from "@/components/workoutDetails/AddToPlanButton";
import SaveForLaterButton from "@/components/workoutDetails/SaveForLaterButton";
import type { Metadata } from "next";

interface IWorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getWorkouts = async () => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workouts data", error);
    return [];
  }
};

export async function generateMetadata({
  params,
}: IWorkoutDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const workoutsData = await getWorkouts();
  const workout = workoutsData.find(
    (w: IWorkout) => String(w.id) === id,
  ) as IWorkout;

  if (!workout) {
    return { title: "Workout Not Found — FitLog" };
  }
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { id } = await params;
  const workoutsData = await getWorkouts();
  const workout = workoutsData.find(
    (w: IWorkout) => String(w.id) === id,
  ) as IWorkout;

  if (!workout) {
    notFound();
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-[#CCFF00]"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Library</span>
          </Link>
        </div>

        {/* Two-Column Grid matching Figma */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Visual / Media */}
          <div className="lg:col-span-6">
            <div className="relative h-95 sm:h-120 lg:h-155 w-full overflow-hidden rounded-3xl border border-[#1E232E] bg-[#14171F] shadow-2xl shadow-black/60">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Sections */}
          <div className="flex flex-col lg:col-span-6">
            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              {workout.name}
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#CCFF00] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-sm"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Key Specs Table / Panel */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-[#1E232E] bg-[#12151C]">
              <div className="flex items-center justify-between border-b border-[#1E232E] px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  EQUIPMENT
                </span>
                <span className="font-semibold text-white">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1E232E] px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  DIFFICULTY
                </span>
                <span className="font-semibold text-white">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1E232E] px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  SETS
                </span>
                <span className="font-semibold text-white">{workout.sets}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1E232E] px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  REPS
                </span>
                <span className="font-semibold text-white">{workout.reps}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1E232E] px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  DURATION
                </span>
                <span className="font-semibold text-white">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1E232E] px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  CALORIES
                </span>
                <span className="font-semibold text-white">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
                <span className="font-bold uppercase tracking-wider text-zinc-400">
                  RATING
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <span>{workout.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
            </div>

            {/* INSTRUCTIONS Section */}
            <div className="mt-8">
              <h2 className="font-display text-base sm:text-lg font-black uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h2>
              <div className="mt-4 space-y-3">
                {workout.instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-zinc-300"
                  >
                    <span className="font-bold text-zinc-400 select-none">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call-to-action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <AddToPlanButton workout={workout} />
              <SaveForLaterButton workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
