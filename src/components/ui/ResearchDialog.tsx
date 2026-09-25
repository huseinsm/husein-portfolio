"use client";

import { useEffect, useRef } from "react";
import { categoryLabels } from "@/data/projects";
import type { ResearchItem } from "@/lib/types";

interface ResearchDialogProps {
  item: ResearchItem | null;
  onClose: () => void;
}

/** Full write-up of a research item, shown in a native modal dialog. */
export function ResearchDialog({ item, onClose }: ResearchDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !item) return;
    dialog.showModal();
    dialog.scrollTop = 0;
    // The page behind a modal should not scroll.
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      if (dialog.open) dialog.close();
    };
  }, [item]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // A click that lands on the dialog element itself is a click on the backdrop.
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="research-dialog-title"
      className="research-dialog m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {item && (
        <article className="p-6 sm:p-10">
          <header className="flex items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="text-muted">{item.code}</span>
                {item.categories.map((c) => (
                  <span key={c} className="rounded-full border border-line px-2.5 py-0.5 text-fg/70">
                    {categoryLabels[c]}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  {item.status}
                </span>
              </div>
              <h2 id="research-dialog-title" className="mt-4 text-3xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-muted">{item.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="shrink-0 rounded-full border border-line p-2 text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <p className="mt-8 text-[15px] leading-relaxed text-fg/85">{item.details.problem}</p>

          <div className="mt-8 overflow-x-auto pb-1">
            <ol className="flex min-w-max items-center font-mono text-xs">
              {item.pipeline.map((step, idx) => (
                <li key={step} className="flex items-center">
                  <span className="rounded-lg border border-line bg-bg/70 px-3 py-2 text-fg/85">{step}</span>
                  {idx < item.pipeline.length - 1 && (
                    <span className="pipeline-link mx-1 h-px w-6 sm:w-10" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>

          <h3 className="mt-10 font-mono text-xs tracking-widest text-accent uppercase">How it works</h3>
          <ol className="mt-5 space-y-6">
            {item.details.approach.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-10 font-mono text-xs tracking-widest text-accent uppercase">Results</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {item.details.results.map((r) => (
              <li key={r.label} className="rounded-xl border border-line bg-bg/50 p-4">
                <p className="text-gradient font-mono text-2xl font-semibold">{r.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{r.label}</p>
              </li>
            ))}
          </ul>

          {item.details.myRole && (
            <>
              <h3 className="mt-10 font-mono text-xs tracking-widest text-accent uppercase">My part</h3>
              <ul className="mt-5 space-y-2.5 text-sm text-fg/85">
                {item.details.myRole.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex flex-wrap gap-1.5">
            {item.details.stack.map((t) => (
              <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
          </div>

          <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted">Role</dt>
              <dd className="mt-1 text-fg/90">{item.role}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Affiliation</dt>
              <dd className="mt-1 text-fg/90">{item.affiliation}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Period</dt>
              <dd className="mt-1 text-fg/90">{item.period}</dd>
            </div>
          </dl>

          {item.details.next && (
            <p className="mt-6 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-fg/80">
              <span className="font-mono text-xs text-accent">Status · </span>
              {item.details.next}
            </p>
          )}
        </article>
      )}
    </dialog>
  );
}
