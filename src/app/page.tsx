import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col px-6 py-10">
      <div className="flex-grow flex items-center justify-center">
        <div className="grid gap-10 md:grid-cols-2 items-center max-w-5xl w-full">
          <div className="max-w-xl pl-10 mt-5">
            <h1>
              <span className="text-6xl sm:text-6xl xl:text-8xl font-modernist font-bold tracking-tighter hover:tracking-normal duration-700 block">
                Hello, I&apos;m
              </span>
              <span className="text-6xl xl:text-8xl font-modernist tracking-tighter hover:tracking-normal duration-700 block">
                Rohan Baburaj
              </span>
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[220px] h-[220px] md:scale-180 mt-5 md:ml-40">
              <div className="hidden [@media(min-width:600px)]:flex flex-col gap-2 absolute top-1/2 -translate-y-1/2 -left-[110px]">
                <span className="inline-block h-5 px-3 py-1 text-xs bg-white rounded-l-md text-black">
                  Next.js
                </span>
                <span className="inline-block h-5 px-3 py-1 font-mono text-xs bg-slate-800 rounded-l-md text-cyan-500">
                  Tailwind
                </span>
                <span className="inline-block h-5 px-3 py-1 font-mono text-xs bg-blue-400 rounded-l-md text-white">
                  TypeScript
                </span>
                <span className="inline-block h-5 px-3 py-1 font-mono text-xs bg-neutral-800 rounded-l-md text-blue-400">
                  React Native
                </span>
              </div>

              <Image
                aria-hidden
                className="rounded-xl object-cover opacity-80"
                src="/flowerField.jpg"
                alt="image"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-center pt-8 ">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-red-600 text-xs opacity-75"
          href="https://youtu.be/O7FIiYsVy3U"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Site under construction — in the meantime, enjoy this masterpiece.
        </a>
      </div>
    </section>
  );
}
