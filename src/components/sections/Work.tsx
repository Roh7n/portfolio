import Image from "next/image";
import { techStacks } from "@/utils/data";
import { TechRow } from "../ui/TechRow";

export default function About() {
  return (
    <section id="work" className="min-h-screen flex flex-col px-10 py-5 pt-20">
      <div className="border-b-2 text pb-6 border-black w-full">
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-instrument-light">
          Work
        </h1>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap px-6 md:px-10 py-4 gap-4  tracking-tighter top-0 w-full ">
        <div className="relative w-full flex ">
          <Image
            className="rounded-xl my-10  "
            src="/timeline.svg"
            alt="image"
            width={756}
            height={756}
          />
          <div
            className="absolute text-xs md:text-sm font-poppins 
                          top-[40px] -left-[40px] 
                          lg:top-[110px] xl:top-[90px]"
          >
            JSpiders Java Trainee <br /> Nov 23&apos; &mdash; Jun 24&apos;
          </div>

          <div
            className="absolute text-xs md:text-sm font-poppins
                        top-[120px] left-[50px] 
                        lg:top-[220px] lg:left-[90px] 
                        xl:top-[260px] xl:left-[190px]"
          >
            IQ Matrix Infoways <br /> Aug 24&apos; &mdash; Jun 25&apos;
          </div>

          <div
            className="absolute text-xs md:text-sm font-poppins
                            top-[88px] left-[170px] 
                            lg:top-[175px] lg:left-[240px] 
                            xl:top-[180px] xl:left-[450px] "
          >
            Freelance <br /> Aug 25&apos; &mdash; Present
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-poppins tracking-tighter pb-6 w-full">
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

      <div className="text-4xl  md:text-6xl font-instrument-light tracking-tighter mt-10">
        Focus on building practical, reliable digital solutions. From developing
        leave-management systems and reusable UI components to creating
        cross-platform mobile apps, my work is driven by clear thinking,
        attention to detail, and a problem-solving mindset that helps teams move
        faster and work better.
      </div>
    </section>
  );
}
