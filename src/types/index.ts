export interface PersonalInfo {
  name: string;
  shortName: string;
  handle: string;
  role: string;
  tagline: string;
  location: string;
  avatarUrl: string;
  avatarHoverUrl?: string;
  email: string;
  status: {
    available: boolean;
    text: string;
  };
  socials: {
    github: string;
    linkedin: string;
    instagram?: string;
    twitter?: string;
    email: string;
  };
}

export interface AboutSection {
  paragraphs: string[];
}

export interface TechItem {
  name: string;
  icon?: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'AI & Tools' | 'Tools & Others';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Full-Stack' | 'Frontend' | 'Mobile' | 'Desktop' | 'Academic';
  githubUrl?: string;
  liveUrl?: string;
  linkLabel?: string;
  featured?: boolean;
  spotlight?: boolean; // Highlighted in 3D Card Deck
  stars?: number;
  image?: string;
  imageType?: 'logo' | 'preview';
  year: string;
  highlightPoints?: string[];
}

export interface DesignProject {
  id: string;
  title: string;
  description: string;
  image: string;
  designUrl: string;
  tags: string[];
  screens: DesignScreen[];
}

export interface DesignScreen {
  id: string;
  title: string;
  image: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  description?: string;
  isFilledDot?: boolean;
  type: 'education' | 'experience' | 'milestone';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  credentialId?: string;
  logoType?: 'google' | 'upskilltech' | 'coursera';
  logoUrl?: string;
  skills?: string[];
  description?: string;
}

export interface CurrentlyItem {
  icon: string; // Lucide icon name
  label: string;
  value: string;
}

export interface Affiliation {
  name: string;
  url?: string;
  role?: string;
}

export interface AIQuestionAnswer {
  keywords: string[];
  question: string;
  answer: string;
}

export interface TypingQuote {
  id: string;
  quote: string;
  author: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: AboutSection;
  techStack: TechItem[];
  projects: Project[];
  spotlightProjects: Project[];
  designProjects: DesignProject[];
  timeline: TimelineItem[];
  certifications: Certification[];
  currently: CurrentlyItem[];
  affiliations: Affiliation[];
  aiQuestions: AIQuestionAnswer[];
  typingQuotes: TypingQuote[];
  presence: {
    baseCount: number;
    avatars: string[];
  };
}

