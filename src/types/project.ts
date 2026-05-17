export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  status: "production" | "development" | "planned";
  techStack: string[];
  features: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}
