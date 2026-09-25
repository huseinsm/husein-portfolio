import { awards } from "@/data/awards";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const years = [...new Set(awards.map((a) => a.year))];

export function Awards() {
  return (
    <section id="awards" className="section">
      <SectionHeading index="05" eyebrow="Awards" title="Honors & achievements." />

      <div className="space-y-10">
        {years.map((year) => (
          <Reveal key={year} className="grid gap-4 md:grid-cols-[6rem_1fr]">
            <p className="font-mono text-sm text-muted md:pt-5">{year}</p>
            <ul className="card divide-y divide-line">
              {awards
                .filter((a) => a.year === year)
                .map((a) => (
                  <li
                    key={`${a.rank}-${a.title}`}
                    className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-xs tracking-wider text-accent uppercase">{a.rank}</p>
                      <p className="mt-1 text-fg/90">{a.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{a.organizer}</p>
                    </div>
                    <span className="shrink-0 self-start rounded-full border border-line px-3 py-1 font-mono text-xs text-fg/70 sm:self-center">
                      {a.level}
                    </span>
                  </li>
                ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
