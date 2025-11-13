import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen  text-white flex flex-col">
      <div className="flex flex-1 items-center justify-center gap-20 px-16">
        <div className="max-w-xl">
          <h1>
            <span className="text-6xl tracking-tighter 2xl:text-8xl">
              Hello, I&apos;m
              <br />
            </span>
            <span className="text-gradient text-6xl 2xl:text-8xl">
              Rohan Baburaj.
            </span>
          </h1>
        </div>

        <div className="relative ">
          <div className="absolute -left-[114px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <span className="px-3 py-1  text-xs  tracking-wide bg-white rounded-l-md text-black">
              Next.js
            </span>

            <span className="px-3 py-1  font-mono text-xs   tracking-wide  bg-slate-800 rounded-l-md text-cyan-500">
              Tailwind
            </span>

            <span className="px-3 py-1 font-mono text-xs  tracking-wide bg-blue-400 rounded-l-md text-white">
              TypeScript
            </span>

            <span className="px-3 py-1 font-mono text-xs tracking-wide bg-neutral-800 rounded-l-md text-blue-400">
              React Native
            </span>
          </div>
          <div className="w-[420px] h-[420px] rounded-xl bg-white/5 flex items-center opacity-40 justify-center">
            <Image
              aria-hidden
              className="rounded-xl"
              src="/flowerField.jpg"
              alt="image"
              width={420}
              height={420}
            />
          </div>
        </div>
      </div>

      <div className="pb-6 flex tracking-tighter justify-center text-center opacity-50 text-xs">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-red-500"
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
