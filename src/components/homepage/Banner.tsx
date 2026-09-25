import Image from "next/image";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
    return (
        <section className="px-4 pt-6 pb-10 sm:px-6 lg:px-8 lg:pt-8">
            <div className="mx-auto w-full overflow-hidden rounded-3xl border border-[#1E232E] bg-[#15171D] shadow-2xl shadow-black/30">
                <div className="grid min-h-140 items-center px-8 py-12 sm:px-12 sm:py-16 lg:min-h-162.5 lg:grid-cols-12 lg:px-20 lg:py-16 xl:px-24">
                    {/* Left Content */}
                    <div className="lg:col-span-8">
                        <p className="mb-8 text-sm font-black uppercase tracking-[0.12em] text-[#CCFF00]">
                            WORKOUT LIBRARY
                        </p>

                        <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[78px]">
                            TRAIN WITH INTENT. LOG
                            <br />
                            EVERY SET.
                        </h1>

                        <p className="mt-8 max-w-180 text-base leading-relaxed text-[#9CA3AF] sm:text-lg lg:text-xl">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                            into today&apos;s plan, and watch the week&apos;s work add up.
                        </p>

                        <div className="mt-10">
                            <a
                                href="#library"
                                className="inline-flex items-center justify-center rounded-lg bg-[#CCFF00] px-8 py-4 text-sm font-black uppercase tracking-wide text-black transition-all duration-200 hover:bg-[#baff00] hover:shadow-lg hover:shadow-[#ccff00]/20 active:scale-95"
                            >
                                BROWSE WORKOUTS
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative mt-10 flex h-75 items-center justify-center lg:col-span-4 lg:mt-0 lg:h-125">
                        <Image
                            src={bannerImg}
                            alt="Gym Machine & Anatomical Figure"
                            priority
                            className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 500px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
