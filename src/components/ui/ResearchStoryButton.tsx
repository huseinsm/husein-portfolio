"use client";

import { useState } from "react";
import type { ResearchItem } from "@/lib/types";
import { ArrowIcon } from "./Icons";
import { ResearchDialog } from "./ResearchDialog";

export function ResearchStoryButton({ item }: { item: ResearchItem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs text-accent transition hover:bg-accent/20"
      >
        Read the full story
        <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      <ResearchDialog item={open ? item : null} onClose={() => setOpen(false)} />
    </>
  );
}
