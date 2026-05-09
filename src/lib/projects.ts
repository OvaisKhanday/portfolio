export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | {
      type: "video";
      src: string;
      /** MIME type override. Defaults to "video/mp4". */
      mimeType?: string;
      poster?: string;
      alt?: string;
    };

export interface Project {
  id: number;
  title: string;
  tagLine: string;
  description: string;
  media: ProjectMedia[];
  liveLink?: string;
  codeLink?: string;
  stack: string[];
  year: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "CaseCobra",
    tagLine: "Custom-printed phone cases, end-to-end e-commerce.",
    description:
      "A full-stack store where customers upload artwork, position it on a 3D phone preview, and check out securely. Built with Next.js App Router, server actions, Stripe, and an image-pipeline that crops & validates uploads on the fly.",
    media: [
      { type: "image", src: "/projects/casecobra/hero.png", alt: "CaseCobra storefront" },
    ],
    liveLink: "https://casecobra-mu.vercel.app/",
    codeLink: "https://github.com/OvaisKhanday/casecobra",
    stack: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Stripe"],
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "Quixlar",
    tagLine: "An online quiz platform for educators and teams.",
    description:
      "Quixlar lets anyone create, share, and take quizzes with rich question types, timers, and live scoring. Designed around a clean authoring flow and a lightweight, mobile-first participant experience.",
    media: [
      { type: "image", src: "/projects/quixlar/screenshot-1.png", alt: "Quixlar dashboard" },
      { type: "image", src: "/projects/quixlar/screenshot-2.png", alt: "New Quiz dashboard" },
      {
        type: "video",
        src: "/projects/quixlar/walkthrough.webm",
        mimeType: "video/mp4",
        poster: "/projects/quixlar/hero.png",
        alt: "Quixlar live demo",
      },
    ],
    liveLink: "https://quixlar.vercel.app/",
    codeLink: "https://github.com/OvaisKhanday/quixlar",
    stack: ["Next.js", "MongoDB", "Tailwind", "NextAuth"],
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "Chat8",
    tagLine: "Real-time chat with WebSocket-powered messaging.",
    description:
      "A real-time chat app with instant message delivery, typing indicators, and presence — built on top of WebSockets for low-latency, bidirectional communication. Ships with auth, persisted history, and a responsive UI.",
    media: [
      { type: "image", src: "/projects/chat8/hero.png", alt: "Chat8 messaging UI" },
    ],
    codeLink: "https://github.com/OvaisKhanday/Chat8/",
    stack: ["React", "Node.js", "Socket.IO", "MongoDB"],
    year: "2024",
    featured: true,
  },
  {
    id: 4,
    title: "careTracker",
    tagLine: "Live GPS tracking for school buses.",
    description:
      "A full-stack school transport platform that streams bus locations via GPS so parents can monitor pickup and drop-off in real time. The architecture handles fleet-scale telemetry and offers a clean parent-facing mobile app.",
    media: [
      { type: "image", src: "/projects/caretracker/hero.png", alt: "careTracker app" },
    ],
    codeLink: "https://github.com/OvaisKhanday/careTracker",
    stack: ["Flutter", "Node.js", "MongoDB", "GPS"],
    year: "2024",
  },
  {
    id: 5,
    title: "Collaborative Whiteboard",
    tagLine: "Real-time multi-user drawing with rooms.",
    description:
      "A collaborative whiteboard with multi-room support, Keycloak authentication, and WebSocket-driven realtime sync. Strokes, shapes, and presence are broadcast with sub-100ms latency.",
    media: [
      { type: "image", src: "/projects/whiteboard/hero.png", alt: "Whiteboard interface" },
      {
        type: "video",
        src: "/projects/whiteboard/recording-1.m4v",
        mimeType: "video/mp4",
        poster: "/projects/whiteboard/hero.png",
        alt: "Whiteboard live demo",
      },
    ],
    codeLink: "https://github.com/OvaisKhanday/whiteboard",
    stack: ["React", "WebSocket", "Keycloak", "Canvas"],
    year: "2024",
  },
  {
    id: 6,
    title: "AqwaMarq",
    tagLine: "Cross-platform watermarking for PDFs and images.",
    description:
      "A desktop-class app for batch-watermarking PDFs and images with custom text, opacity, position, and rotation. Designed to be fast, offline-friendly, and platform-agnostic.",
    media: [
      { type: "image", src: "/projects/aqwamarq/hero.webp", alt: "AqwaMarq app" },
    ],
    codeLink: "https://github.com/OvaisKhanday/aqwamarq",
    stack: ["Java", "PDF", "Image processing"],
    year: "2023",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
