"use client";

import { useState, type ReactNode } from "react";
import { categoryLabels, projects } from "@/data/projects";
import { research } from "@/data/research";
import type { Project, ProjectCategory, ResearchItem } from "@/lib/types";
import { ArrowIcon, GitHubIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ResearchDialog } from "@/components/ui/ResearchDialog";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "cv", "nlp", "ml", "data"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<ResearchItem | null>(null);

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const researchCards = visible.filter((p) => p.research);
  const repoCards = visible.filter((p) => !p.research);

  return (
    <section id="projects" className="section">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Projects."
        description="Research I'm part of, and hands-on builds across computer vision, NLP, and machine learning. Every build links to its code on GitHub."
      />

      <Reveal className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === "all" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === f
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-line text-muted hover:text-fg"
              }`}
            >
              {f === "all" ? "All" : categoryLabels[f]}
              <span className="ml-2 font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </Reveal>

      {researchCards.length > 0 && (
        <>
          <GroupLabel>Research · click for the full story</GroupLabel>
          <ul className="mb-12 grid gap-4 md:grid-cols-3">
            {researchCards.map((p) => {
              const item = research.find((r) => r.code === p.research);
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    onClick={() => item && setOpen(item)}
                    className="card group relative flex h-full w-full flex-col overflow-hidden p-6 text-left"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                      aria-hidden
                    />
                    <CardTop project={p} />
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                    {p.highlight && <Highlight {...p.highlight} />}
                    <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                      Read the full story
                      <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {repoCards.length > 0 && (
        <>
          <GroupLabel>Builds · open source on GitHub</GroupLabel>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repoCards.map((p) => (
              <li key={p.title}>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="card group flex h-full flex-col p-6"
                >
                  <CardTop project={p} icon={<GitHubIcon className="h-4 w-4 text-muted transition group-hover:text-accent" />} />
                  <h3 className="mt-6 text-lg leading-snug font-medium">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  {p.highlight && <Highlight {...p.highlight} />}
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <ResearchDialog item={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <p className="mb-4 font-mono text-xs tracking-wider text-muted uppercase">{children}</p>;
}

function CardTop({ project, icon }: { project: Project; icon?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 font-mono text-xs">
      <span className="text-accent">{project.categories.map((c) => categoryLabels[c]).join(" · ")}</span>
      <span className="flex items-center gap-2">
        {project.team && <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">Team</span>}
        {icon}
      </span>
    </div>
  );
}

function Highlight({ value, label }: { value: string; label: string }) {
  return (
    <p className="mt-5 flex items-baseline gap-2">
      <span className="text-gradient font-mono text-xl font-semibold">{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </p>
  );
}
