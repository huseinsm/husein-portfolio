import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="section">
      <div className="grid items-start gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SectionHeading index="01" eyebrow="About" title="Research-minded, results-driven." />
          <Reveal className="-mt-4 space-y-5 text-lg leading-relaxed text-fg/85">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-2">
          <ul className="card divide-y divide-line">
            {profile.facts.map((f) => (
              <li key={f.label} className="px-6 py-5">
                <p className="font-mono text-xs tracking-wider text-accent uppercase">{f.label}</p>
                <p className="mt-1 text-fg/90">{f.value}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
