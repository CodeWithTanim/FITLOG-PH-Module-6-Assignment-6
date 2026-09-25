import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
            <span className="font-display text-8xl sm:text-9xl font-black tracking-tighter text-[#CCFF00] drop-shadow-[0_10px_30px_rgba(204,255,0,0.2)]">
                404
            </span>

            <h1 className="font-display mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                PAGE NOT FOUND !!!
            </h1>

            <p className="mt-3 max-w-md text-sm sm:text-base text-zinc-400">
                The route you are looking for has been removed or does not exist. Head
                back to the workout library to keep your session moving.
            </p>

            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#CCFF00] px-8 py-3.5 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-[#b8e600] active:scale-95 shadow-lg shadow-[#ccff00]/15"
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span>Back to Workouts</span>
            </Link>
        </div>
    );
}
