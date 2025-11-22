import Image from "next/image";
import { techStacks } from "@/constants/data";
import { TechRow } from "../ui/TechRow";

export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col px-10 py-5 pt-20">
      <div className="border-b-2 text pb-6 border-black w-full">
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-instrument-light">
          Experience
        </h1>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap px-6 md:px-10 py-4 gap-4  tracking-tighter top-0 w-full ">
        <div className="relative w-full flex ">
          <Image
            className="rounded-xl object-cover my-10 md:mx-15 "
            src="/timeline.svg"
            alt="image"
            width={756}
            height={756}
          />
          <div className="absolute top-[50px] -left-[40px] md:top-[70px] md:left-[10px]  text-sm font-poppins ">
            JSPiders Java Trainee <br /> Nov 23’ – Jun 24’
          </div>

          <div className="absolute top-[185px] left-[120px] md:left-[200px] md:top-[220px] lg:left-[250px] lg:top-[260px] text-sm font-poppins">
            IQ Matrix Infoways <br /> Aug 24’ – Jun 25’
          </div>

          <div className="absolute top-[130px] left-[300px] md:left-[420px] md:top-[155px] lg:left-[500px] lg:top-[180px] text-sm font-poppins">
            Freelance <br /> Aug 25’ – Present
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-4xl font-poppins tracking-tighter pb-6 w-full">
            Tech Stacks
          </h1>

          {techStacks.map((section, index) => (
            <TechRow
              key={index}
              title={section.title}
              items={section.items}
              isLast={index === techStacks.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="text-6xl font-instrument-light tracking-tighter mt-10">
        Focus on building practical, reliable digital solutions. From developing
        leave-management systems and reusable UI components to creating
        cross-platform mobile apps, my work is driven by clear thinking,
        attention to detail, and a problem-solving mindset that helps teams move
        faster and work better.
      </div>
    </section>
  );
}
