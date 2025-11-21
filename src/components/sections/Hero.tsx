"use client";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import Pill from "../ui/Pill";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col px-6 py-5">
      <div className="flex-grow flex items-center justify-center mt-10 ">
        <div className="grid md:grid-cols-2 items-center max-w-5xl w-full ">
          <div className="flex flex-col max-w-xl pl-5 mt-30 md:mt-4 gap-8 ">
            <div className="flex flex-row items-center space-x-1.5 ">
              <Pill text="next.js" />
              <Pill text="tailwindcss" />
              <Pill text="typescript" />
            </div>
            <h1>
              <span className="text-5xl sm:text-6xl xl:text-7xl font-modernist font-bold tracking-tighter hover:tracking-normal duration-700 block">
                Hello, I&apos;m
              </span>
              <span className="text-5xl xl:text-7xl font-modernist tracking-tighter hover:tracking-normal duration-700 block">
                Rohan Baburaj
              </span>
            </h1>
            <div className="font-poppins w-fit hover:backdrop-blur-[2px]">
              I create clean, modern, and fully responsive websites that blend
              seamless design with functionality.
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-60 md:scale-145  mt-5 md:ml-40 ">
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
        <MoveDown
          className={`"mt-1 animate-bounce transition-opacity duration-500 
          ${isScrolled ? "opacity-0" : "opacity-100"}`}
          size={50}
          strokeWidth={0.5}
        />
      </div>
    </section>
  );
}
