import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IWorkout } from "@/types/workout.type";
import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

interface IWorkoutCardProps {
    workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#1E232E] bg-[#14171F] transition-all duration-300 hover:-translate-y-1 hover:border-[#2F384A] hover:shadow-2xl hover:shadow-black/60 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50"
        >
            {/* Exercise Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Muscle Group Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {workout.muscleGroups.map((group) => (
                        <span
                            key={group}
                            className="rounded-full bg-[#CCFF00] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black sm:text-[11px]"
                        >
                            {group}
                        </span>
                    ))}
                </div>

                {/* Workout Name */}
                <h3 className="mt-3 line-clamp-1 font-display text-lg font-bold uppercase tracking-tight text-white transition-colors group-hover:text-[#CCFF00] sm:text-xl">
                    {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-1 line-clamp-1 text-xs text-zinc-400">
                    {workout.equipment}
                </p>

                {/* Stats Row */}
                <div className="mt-5 flex items-center justify-between border-t border-[#1D232F] pt-3.5 text-xs text-zinc-400">
                    {/* Duration */}
                    <div className="flex items-center gap-1.5">
                        <FiClock className="h-3.5 w-3.5 text-[#CCFF00]" strokeWidth={2} />

                        <span>{workout.duration} min</span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center gap-1.5">
                        <FaFire className="h-3.5 w-3.5 text-[#CCFF00]" />

                        <span>{workout.caloriesBurned} kcal</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <FiStar className="h-3.5 w-3.5 text-[#CCFF00]" strokeWidth={2} />

                        <span>{workout.rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;
