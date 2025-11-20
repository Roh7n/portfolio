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
            <div className="relative mt-5 md:ml-40 ">
              <Image
                aria-hidden
                className="rounded-xl object-cover"
                src="/eye.png"
                alt="image"
                width={756}
                height={756}
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
