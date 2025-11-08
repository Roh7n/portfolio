import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <h1>Hi, my name is Rohan baburaj</h1>
        <h1>I'm a junior software Developer</h1>
      </main>
      <footer className="row-start-3 flex gap-[24px] text-xs flex-wrap items-center justify-center">
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
      </footer>
    </div>
  );
}
