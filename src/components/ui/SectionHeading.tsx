import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title?: string;
  description?: string;
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">
        <span className="text-muted">{index} /</span> {eyebrow}
      </p>
      {title && <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>}
      {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
    </Reveal>
  );
}
