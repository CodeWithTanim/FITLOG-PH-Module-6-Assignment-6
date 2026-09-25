import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-[#181D26] bg-[#0A0C10]">
            <div className="mx-auto flex min-h-35 w-full items-center justify-between px-8 sm:px-10 lg:px-9">
                <Link href="/" className="group flex items-center gap-2.5">
                    <Image
                        src={logo}
                        alt="FitLog dumbbell logo"
                        width={25}
                        height={25}
                        className="object-contain"
                    />
                    <span className="font-display text-lg font-black tracking-wide text-white transition-colors group-hover:text-[#CCFF00]">
                        FITLOG
                    </span>
                </Link>
                <p className="text-right text-xs text-zinc-500 sm:text-sm">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
