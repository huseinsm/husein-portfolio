export type ProjectCategory = "cv" | "nlp" | "ml" | "data";

export interface Project {
  title: string;
  categories: ProjectCategory[];
  description: string;
  tags: string[];
  /** GitHub repository for standalone projects. */
  repo?: string;
  /** Research `code` — the card opens that research item's detail panel instead of a repo. */
  research?: string;
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
  /** Current status or what comes next. */
  next?: string;
}

export interface ResearchItem {
  code: string;
  categories: ProjectCategory[];
  title: string;
  subtitle: string;
  role: string;
  affiliation: string;
  period: string;
  status: "Ongoing" | "Published" | "Completed";
  pipeline: string[];
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
