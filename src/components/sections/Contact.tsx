import { profile } from "@/data/profile";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: "GitHub", value: "github.com/huseinsm", href: profile.links.github, Icon: GitHubIcon },
  { label: "LinkedIn", value: "Husein Sidharta Muhammad", href: profile.links.linkedin, Icon: LinkedInIcon },
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="card relative overflow-hidden px-6 py-14 sm:px-12">
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-accent/15 blur-[90px]" />
          <p className="font-mono text-xs tracking-widest text-accent uppercase">
            <span className="text-muted">06 /</span> Contact
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something <span className="text-gradient">intelligent</span> together.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Open to research collaborations, internships, and AI engineering roles.
          </p>

          <ul className="relative mt-10 grid gap-3 sm:grid-cols-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-line bg-bg/60 p-4 transition hover:border-accent/40"
                >
                  <span className="rounded-lg bg-white/5 p-2.5 text-fg/80 group-hover:text-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate text-sm text-fg/90">{value}</span>
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
