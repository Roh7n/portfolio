import Image from "next/image";
import Link from "next/link";
import GlitchText from "../ui/GlitchText";

export default function Header() {
  return (
    <header className="flex flex-wrap md:flex-nowrap items-center px-6 md:px-10 py-4 gap-4 fixed tracking-tighter top-0 w-full backdrop-blur-lg z-50">
      <div className="w-full hidden md:block md:basis-1/9 font-poppins-light items-center md:items-center">
        <GlitchText className="text-2xl md:text-3xl">Rohan</GlitchText>
        <span className="text-xl md:text-2xl ml-1">®</span>
      </div>

      <div className="w-full md:basis-1/6 flex md:justify-start justify-center">
        <Link href="#home">
          <Image src="/logo.svg" alt="logo" width={45} height={45} />
        </Link>
      </div>

      <div className="w-full md:basis-4/6 text-lg md:text-xl font-poppins-light flex justify-center gap-2 md:justify-end">
        <Link href="#about">
          <GlitchText className="hover:underline">Work</GlitchText>
        </Link>
        <span>•</span>
        <Link href="#skills">
          <GlitchText className="hover:underline">Skills</GlitchText>
        </Link>
        <span>•</span>
        <Link href="#projects">
          <GlitchText className="hover:underline">Projects</GlitchText>
        </Link>
      </div>

      <div className="w-full md:basis-1/6 text-lg md:text-xl font-poppins-light flex justify-center md:justify-end">
        <GlitchText className="hover:underline">Let&apos;s talk</GlitchText>
      </div>
    </header>
  );
}
