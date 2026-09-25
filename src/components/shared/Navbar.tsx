"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";

const Navbar = () => {
    const pathname = usePathname();
    const { planWorkouts, savedWorkouts } = useContext(WorkoutContext);

    const isWorkoutsActive = pathname === "/workouts" || pathname === "/";
    const isMyPlanActive = pathname === "/my-plan";

    return (
        <div className="border-b border-[#20242c] bg-[#0d0f12]">
            <div className="navbar min-h-20 px-6 lg:px-16">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost text-white lg:hidden"
                        >
                            <svg
                                aria-label="Menu"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box border border-[#20242c] bg-[#0d0f12] p-2 shadow-lg"
                        >
                            <li>
                                <Link
                                    href="/"
                                    className={
                                        isWorkoutsActive
                                            ? "bg-[#182b08] font-semibold text-[#ccff00]"
                                            : "text-[#9ca3af]"
                                    }
                                >
                                    Workouts
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-plan"
                                    className={
                                        isMyPlanActive
                                            ? "bg-[#182b08] font-semibold text-[#ccff00]"
                                            : "text-[#9ca3af]"
                                    }
                                >
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="btn btn-ghost px-2 text-3xl font-bold tracking-tight text-white hover:bg-transparent"
                    >
                        FITLOG
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center gap-1 px-1">
                        <li>
                            <Link
                                href="/"
                                className={`rounded-full px-5 py-2 text-sm transition-all ${isWorkoutsActive
                                    ? "bg-[#182b08] font-semibold text-[#ccff00]"
                                    : "text-[#9ca3af] hover:bg-[#15181d] hover:text-white"
                                    }`}
                            >
                                Workouts
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/my-plan"
                                className={`rounded-full px-5 py-2 text-sm transition-all ${isMyPlanActive
                                    ? "bg-[#182b08] font-semibold text-[#ccff00]"
                                    : "text-[#9ca3af] hover:bg-[#15181d] hover:text-white"
                                    }`}
                            >
                                My Plan
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end gap-3 sm:gap-4">
                    <Link
                        href="/my-plan?tab=plan"
                        className="flex items-center gap-2 text-sm font-medium text-[#d1d5db] transition-colors hover:text-white"
                    >
                        <span>Plan</span>
                        <span
                            id="navbar-plan-count"
                            className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-black text-black"
                        >
                            {planWorkouts.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan?tab=saved"
                        className="flex items-center gap-2 text-sm font-medium text-[#d1d5db] transition-colors hover:text-white"
                    >
                        <span>Saved</span>
                        <span
                            id="navbar-saved-count"
                            className="flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700 bg-[#161a22] px-1.5 text-xs font-semibold text-zinc-300"
                        >
                            {savedWorkouts.length}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
