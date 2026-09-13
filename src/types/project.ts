export type ProjectCategory = "web" | "terminal" | "tooling";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  status: "production" | "development" | "planned";
  category?: ProjectCategory;
  techStack: string[];
  features: string[];
  image?: string;
  video?: string;
  liveUrl?: string;
  repoUrl?: string;
  view: boolean;
}
