import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-wrap md:flex-nowrap items-center px-6 md:px-10 py-4 gap-4 fixed tracking-tighter top-0 w-full backdrop-blur-lg z-50">
      <div className="w-full hidden md:block md:basis-1/9 font-poppins-light flex items-center md:items-center">
        <span className="text-2xl md:text-3xl">Rohan</span>
        <span className="text-xl md:text-2xl ml-1">®</span>
      </div>

      <div className="w-full md:basis-1/6 flex md:justify-start justify-center">
        <Link href="#home">
          <Image src="/logo.svg" alt="logo" width={45} height={45} />
        </Link>
      </div>

      <div className="w-full md:basis-4/6 text-lg md:text-xl font-poppins-light flex justify-center gap-2 md:justify-end">
        <Link href="#about">About</Link>
        <span>•</span>
        <Link href="#skills">Skills</Link>
        <span>•</span>
        <Link href="#projects">Projects</Link>
      </div>

      <div className="w-full md:basis-1/6 text-lg md:text-xl font-poppins-light flex justify-center md:justify-end">
        Let’s talk
      </div>
    </header>
  );
}
