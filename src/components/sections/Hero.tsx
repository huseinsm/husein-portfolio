import { profile } from "@/data/profile";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { ArrowIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

const MODALITIES = ["Computer Vision", "NLP"];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <NeuralBackground />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-2/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {profile.role} · {profile.location}
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight sm:text-7xl">
          {profile.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {profile.tagline.split("vision meets language")[0]}
          <span className="text-gradient font-medium">vision meets language</span>.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
          {MODALITIES.map((m, i) => (
            <span key={m} className="flex items-center gap-2">
              <span className="rounded-md border border-line bg-surface/70 px-3 py-1 text-fg/80">{m}</span>
              {i < MODALITIES.length - 1 && <span className="text-accent">×</span>}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#research"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition hover:bg-accent"
          >
            View research
            <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-line p-3 text-muted transition hover:border-accent/50 hover:text-fg"
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-line p-3 text-muted transition hover:border-accent/50 hover:text-fg"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
