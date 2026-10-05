import type { StaticImageData } from "next/image";

export type ProjectCategory = "cv" | "nlp" | "ml" | "data";

/** A diagram, photo or screenshot. The caption doubles as alt text. */
export interface Media {
  src: StaticImageData;
  caption: string;
  /** Spans the full width of the gallery instead of half. */
  wide?: boolean;
}

export interface Project {
  title: string;
  categories: ProjectCategory[];
  description: string;
  tags: string[];
  /** GitHub repository for standalone projects. */
  repo?: string;
  /** Research or project-story `code` — the card opens that item's detail panel instead of a repo. */
  research?: string;
  /** Image across the top of the card; `position` is the CSS object-position used when cropping. */
  cover?: { src: StaticImageData; position?: string };
  /** One headline number, shown on the card. */
  highlight?: { value: string; label: string };
  team?: boolean;
}

export interface ResearchDetails {
  /** One-paragraph hook shown at the top of the detail panel. */
  problem: string;
  /** How it works, step by step. */
  approach: { title: string; body: string }[];
  results: { value: string; label: string }[];
  /** Short list of what I owned in the team. */
  myRole?: string[];
  stack: string[];
  /** Photos and screenshots shown under "Documentation". */
  gallery?: Media[];
  /** Current status or what comes next. */
  next?: string;
}

export interface ResearchItem {
  code: string;
  categories: ProjectCategory[];
  title: string;
  subtitle: string;
  role: string;
  affiliation?: string;
  period?: string;
  status: "Ongoing" | "Published" | "Completed";
  pipeline: string[];
  /** Architecture diagram, shown in place of the `pipeline` chips. */
  architecture?: Media;
  /** Code repository, linked from the detail panel. */
  repo?: string;
  /** What I specifically worked on, shown as bullets under the pipeline. */
  contributions?: string[];
  highlight?: { value: string; label: string };
  details: ResearchDetails;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Award {
  rank: string;
  title: string;
  organizer: string;
  level: "International" | "National" | "Provincial" | "University" | "Faculty";
  year: number;
}
