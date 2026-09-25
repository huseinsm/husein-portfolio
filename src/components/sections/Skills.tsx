import { skills } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="Skills & tools."
        description="The methods and tools I use to build and evaluate AI systems across computer vision, NLP, and speech."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 80}
            // An odd last card spans both columns instead of sitting alone.
            className={skills.length % 2 === 1 && i === skills.length - 1 ? "sm:col-span-2" : ""}
          >
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-3 font-medium">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-bg/60 px-3 py-1.5 text-sm text-fg/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
