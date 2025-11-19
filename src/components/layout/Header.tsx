import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between bg-white text-black px-8 py-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium">Rohan ®</span>
        <Image src="/logo.png" alt="logo" width={65} height={65} />
      </div>

      <nav className="flex items-center gap-6 text-lg">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
      </nav>

      <div className="text-lg">Let’s talk</div>
    </header>
  );
}
