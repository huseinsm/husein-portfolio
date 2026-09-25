import { categoryLabels } from "@/data/projects";
import { research } from "@/data/research";
import { Reveal } from "@/components/ui/Reveal";
import { ResearchStoryButton } from "@/components/ui/ResearchStoryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Research() {
  return (
    <section id="research" className="section">
      <SectionHeading
        index="03"
        eyebrow="Research"
        title="Ongoing research."
        description="Current research work, with the pipeline and my role in each. Open any of them for the full story: the problem, how it works, and the results so far."
      />
      <div className="space-y-5">
        {research.map((r, i) => (
          <Reveal key={r.code} delay={i * 80}>
            <article className="card overflow-hidden p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="text-muted">{r.code}</span>
                    {r.categories.map((c) => (
                      <span key={c} className="rounded-full border border-line px-2.5 py-0.5 text-fg/70">
                        {categoryLabels[c]}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                      {r.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-muted">{r.subtitle}</p>
                </div>
                {r.highlight && (
                  <div className="text-right">
                    <p className="text-gradient font-mono text-3xl font-semibold">{r.highlight.value}</p>
                    <p className="mt-1 text-xs text-muted">{r.highlight.label}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 overflow-x-auto pb-1">
                <ol className="flex min-w-max items-center font-mono text-xs">
                  {r.pipeline.map((step, idx) => (
                    <li key={step} className="flex items-center">
                      <span className="rounded-lg border border-line bg-bg/70 px-3 py-2 text-fg/85">
                        {step}
                      </span>
                      {idx < r.pipeline.length - 1 && (
                        <span className="pipeline-link mx-1 h-px w-8 sm:w-12" aria-hidden />
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {r.contributions && (
                <ul className="mt-8 space-y-3 text-sm leading-relaxed text-fg/80">
                  {r.contributions.map((c) => {
                    const [label, ...rest] = c.split(" — ");
                    return (
                      <li key={c} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>
                          <span className="font-mono text-xs text-accent">{label}</span>{" "}
                          {rest.join(" — ")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-muted">Role</dt>
                  <dd className="mt-1 text-fg/90">{r.role}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Affiliation</dt>
                  <dd className="mt-1 text-fg/90">{r.affiliation}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Period</dt>
                  <dd className="mt-1 text-fg/90">{r.period}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <ResearchStoryButton item={r} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
