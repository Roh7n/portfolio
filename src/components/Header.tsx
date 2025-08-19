import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0  w-full  z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between  py-6">
        <Image src="/moon.svg" alt="rb" width={20} height={20} />
        <Image src="/logo.svg" alt="rb" width={57} height={57} />
        <Image src="/Menu_Duo_LG.svg" alt="rb" width={20} height={20} />
      </div>
    </header>
  );
}
