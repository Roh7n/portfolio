import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen  text-white flex flex-col">
      <div className="flex flex-1 items-center justify-center gap-20 px-16">
        <div className="max-w-xl space-y-6">
          <h1>
            <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
              Hello, I&apos;m
              <br />
            </span>
            <span className="text-gradient text-6xl 2xl:text-8xl">
              Rohan Baburaj.
            </span>
          </h1>
        </div>

        <div className="w-[420px] h-[420px] rounded-xl bg-white/5 flex items-center justify-center">
          <span className="opacity-40 text-sm">Graphic goes here</span>
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
