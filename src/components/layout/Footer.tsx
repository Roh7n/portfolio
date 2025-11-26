import Image from "next/image";

export default function Footer() {
  return (
    <section>
      <div className="p-5 flex justify-center ">
        <a
          className="flex items-center gap-2 hover:underline font-mono hover:underline-offset-4 tracking-tighter text-red-600 text-xs opacity-75"
          target="_blank"
          href="https://github.com/Roh7n"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Site under construction — in the meantime, explore my work on GitHub.
        </a>
      </div>
    </section>
  );
}
