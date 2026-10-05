import Image from "next/image";
import type { Media } from "@/lib/types";
import { ArrowIcon } from "./Icons";

interface MediaFigureProps {
  media: Media;
  /** `sizes` for next/image: how wide the figure renders at each breakpoint. */
  sizes: string;
  /** Diagrams are drawn on white, so they get a white frame instead of the page background. */
  diagram?: boolean;
  className?: string;
}

/** An image with its caption. Clicking it opens the full-resolution file in a new tab. */
export function MediaFigure({ media, sizes, diagram = false, className = "" }: MediaFigureProps) {
  return (
    <figure className={className}>
      <a
        href={media.src.src}
        target="_blank"
        rel="noreferrer"
        className={`group relative block overflow-hidden rounded-xl border border-line transition hover:border-accent/50 ${
          diagram ? "bg-white" : "bg-bg/50"
        }`}
      >
        <Image src={media.src} alt={media.caption} sizes={sizes} placeholder="blur" className="h-auto w-full" />
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full border border-line bg-bg/85 px-2.5 py-1 font-mono text-[10px] text-fg/80 opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
          Full size
          <ArrowIcon className="h-3 w-3" />
        </span>
      </a>
      <figcaption className="mt-2 text-xs leading-snug text-muted">{media.caption}</figcaption>
    </figure>
  );
}
