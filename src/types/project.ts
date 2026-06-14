export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  status: "production" | "development" | "planned";
  techStack: string[];
  features: string[];
  image?: string;
  video?: string;
  liveUrl?: string;
  repoUrl?: string;
  view: boolean;
}
