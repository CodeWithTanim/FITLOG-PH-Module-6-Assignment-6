import React from "react";

export default function Loading() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <div className="relative flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#CCFF00]"></span>
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-zinc-400">
                Loading FitLog...
            </p>
        </div>
    );
}
