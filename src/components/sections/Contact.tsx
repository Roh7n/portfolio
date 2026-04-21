import GlitchText from "@/components/ui/GlitchText";

const socials = [
  { label: "GitHub", href: "https://github.com/Roh7n" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohanbabs4446/" },
  { label: "Instagram", href: "https://www.instagram.com/rroh7n/" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col px-10 py-5 pt-20"
    >
      <div className="border-b-2 pb-6 border-black w-full">
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-instrument-light">
          Let&apos;s Talk
        </h1>
      </div>

      <div className="flex-grow flex flex-col justify-center gap-10 py-16">
        <p className="text-4xl md:text-6xl font-instrument-light tracking-tighter max-w-4xl">
          Have a project in mind? Let&apos;s build something great together.
        </p>

        <a
          href="mailto:rohanbaburaj4446@gmail.com"
          className="w-fit"
        >
          <GlitchText className="text-2xl md:text-4xl font-modernist tracking-tighter hover:underline underline-offset-4">
            rohanbaburaj4446@gmail.com
          </GlitchText>
        </a>

        <div className="flex gap-6 font-poppins-light text-lg">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
