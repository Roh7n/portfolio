import Image from "next/image";
import Link from "next/link";

export default function SocialIcon({
  href,
  src,
  alt,
  hoverColor,
}: {
  href: string;
  src: string;
  alt: string;
  hoverColor: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-full ${hoverColor} transition`}
    >
      <Image src={src} alt={alt} width={20} height={20} />
    </Link>
  );
}
