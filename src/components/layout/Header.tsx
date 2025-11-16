import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 w-full backdrop-blur-[2px] px-7 z-50">
      <div className="flex items-center justify-between h-18">
        <Image src="/moon.svg" alt="rb" width={20} height={20} />
        <Image src="/logo.svg" alt="rb" width={75} height={75} />
        <Image src="/Menu_Duo_LG.svg" alt="rb" width={20} height={20} />
      </div>
    </header>
  );
}
