import { MoveDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col px-6 py-5">
      <div className="flex-grow flex items-center justify-center mt-10 ">
        <div className="grid md:grid-cols-2 items-center max-w-5xl w-full ">
          <div className="flex flex-col max-w-xl pl-5 mt-5 gap-8 ">
            <h1>
              <span className="text-5xl sm:text-6xl xl:text-7xl font-modernist font-bold tracking-tighter hover:tracking-normal duration-700 block">
                Hello, I&apos;m
              </span>
              <span className="text-5xl xl:text-7xl font-modernist tracking-tighter hover:tracking-normal duration-700 block">
                Rohan Baburaj
              </span>
            </h1>
            <button className="border font-mono w-fit hover:backdrop-blur-[2px]">
              Get in touch
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[200px] h-[200px] mt-5 md:ml-40 ">
              <div className="hidden absolute [@media(min-width:768px)]:flex flex-col gap-2  top-1/2 -translate-y-1/2 -left-[199px] ">
                <span className="flex items-center justify-start h-6 w-60 px-3 py-1 font-mono text-xs bg-white rounded-l-md text-black transition-all duration-600 ease-out hover:-translate-x-6 hover:bg-black hover:text-white">
                  Next.js
                </span>

                <span className="flex items-center justify-start h-6 px-3 py-1 font-mono text-xs bg-slate-800 rounded-l-md text-cyan-400 transition-all duration-600 ease-out hover:-translate-x-10 hover:bg-sky-400 hover:text-slate-900">
                  Tailwind
                </span>

                <span className="flex items-center justify-start h-6 px-3 py-1 font-mono text-xs bg-blue-500 rounded-l-md text-white transition-all duration-600 ease-out hover:-translate-x-8 hover:bg-blue-600 hover:text-white">
                  TypeScript
                </span>

                <span className="flex items-center justify-start h-6 px-3 py-1 font-mono text-xs bg-neutral-900 rounded-l-md text-blue-400 transition-all duration-600 ease-out hover:-translate-x-4 hover:bg-cyan-300 hover:text-slate-900">
                  React Native
                </span>
              </div>

              <Image
                aria-hidden
                className="rounded-xl object-cover md:scale-180"
                src="/flowerField.jpg"
                alt="image"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-10 justify-center">
        <MoveDown size={50} strokeWidth={0.5} />
      </div>
    </section>
  );
}
