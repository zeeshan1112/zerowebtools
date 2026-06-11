export interface ResumeItem {
  id: string;
  title: string;
  subtitle: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  description: string;
}

export interface SkillItem {
  id: string;
  category: string;
  skills: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: ResumeItem[];
}

export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github?: string;
    summary: string;
    photoUrl?: string;
  };
  experience: ResumeItem[];
  education: ResumeItem[];
  skills: SkillItem[];
  projects: ResumeItem[];
  customSections: CustomSection[];
  settings: {
    template: "executive" | "creative" | "classic" | "elegant";
    primaryColor: string;
    sectionOrder: string[];
    layoutSpacing?: number;
  };
}

export const DEFAULT_RESUME: ResumeData = {
  personal: {
    fullName: "Alexander Hamilton",
    jobTitle: "Principal Systems Engineer",
    email: "alexander.hamilton@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    website: "ahamilton.dev",
    linkedin: "linkedin.com/in/ahamilton",
    github: "github.com/ahamilton",
    summary: "Strategic and results-driven Principal Systems Engineer with over 10 years of experience designing scalable, high-performance cloud architectures. Proven track record of leading cross-functional teams to deliver enterprise-grade infrastructure, optimizing performance by 40%, and reducing operational costs by $1.2M annually.",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
  },
  experience: [
    {
      id: "1",
      title: "Principal Systems Engineer",
      subtitle: "Global Tech Innovations",
      dateStart: "Mar 2020",
      dateEnd: "Present",
      location: "San Francisco, CA",
      description: "• Architected and deployed a multi-region Kubernetes infrastructure serving 50M+ daily active users.\\n• Spearheaded the migration from monolithic architecture to microservices, reducing deployment time from 2 hours to 15 minutes.\\n• Mentored a team of 12 senior engineers, establishing best practices for CI/CD and infrastructure as code (IaC)."
    },
    {
      id: "2",
      title: "Senior DevOps Engineer",
      subtitle: "CloudScale Solutions",
      dateStart: "Jun 2016",
      dateEnd: "Feb 2020",
      location: "Austin, TX",
      description: "• Designed and implemented automated deployment pipelines using Jenkins and Terraform, achieving 99.99% uptime.\\n• Optimized AWS resource utilization, saving the company $400,000 annually.\\n• Developed custom monitoring solutions using Prometheus and Grafana to proactively identify system bottlenecks."
    }
  ],
  education: [
    {
      id: "1",
      title: "Master of Science in Computer Science",
      subtitle: "Stanford University",
      dateStart: "Sep 2014",
      dateEnd: "May 2016",
      location: "Stanford, CA",
      description: "Specialization in Distributed Systems and Cloud Computing. GPA: 3.9/4.0"
    },
    {
      id: "2",
      title: "Bachelor of Science in Software Engineering",
      subtitle: "University of Texas at Austin",
      dateStart: "Sep 2010",
      dateEnd: "May 2014",
      location: "Austin, TX",
      description: "Graduated with Honors. Senior Project: Predictive Load Balancing Algorithm."
    }
  ],
  skills: [
    { id: "1", category: "Cloud & Infrastructure", skills: "AWS, Google Cloud Platform (GCP), Kubernetes, Docker, Terraform" },
    { id: "2", category: "Programming Languages", skills: "Go, Python, TypeScript, Bash, Rust" },
    { id: "3", category: "CI/CD & DevOps", skills: "Jenkins, GitHub Actions, GitLab CI, Ansible, ArgoCD" },
    { id: "4", category: "Monitoring & Observability", skills: "Prometheus, Grafana, Datadog, ELK Stack" }
  ],
  projects: [
    {
      id: "1",
      title: "Open Source Container Orchestrator",
      subtitle: "Personal Project",
      dateStart: "Jan 2022",
      dateEnd: "Present",
      location: "GitHub",
      description: "• Developed a lightweight, open-source container orchestration tool written in Go.\\n• Achieved 5,000+ stars on GitHub and adopted by several startups for edge computing deployments."
    }
  ],
  customSections: [],
  settings: {
    template: "executive",
    primaryColor: "#0f172a",
    sectionOrder: ["experience", "education", "skills", "projects"],
    layoutSpacing: 1
  }
};
