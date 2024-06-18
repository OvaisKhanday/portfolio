export interface ProjectTileProps {
  id: number;
  title: string;
  tagLine: string;
  description: string;
  imageUrl: string;
  liveLink?: string;
  codeLink?: string;
}
export const PROJECTS: ProjectTileProps[] = [
  {
    id: 1,
    title: "casecobra",
    tagLine: "a fullstack e-commerce shop for your custom phone cases",
    description:
      "Developed casecobra, a responsive web app enabling customers to upload photos and create personalized mobile phone cases. Implemented a user-friendly interface for seamless photo uploads and case customization across all devices.",

    imageUrl: "/casecobra-hero-1.png",
    liveLink: "https://casecobra-mu.vercel.app/",
    codeLink: "https://github.com/OvaisKhanday/casecobra",
  },
  {
    id: 2,
    title: "Chat8",
    tagLine: "A reat-time chatting web-app",
    description:
      "Developed Chat8 , a real-time chatting application ensuring seamless and instant communication. Implemented advanced features such as live message updates for an enhanced user experience. Utilized WebSocket technology to achieve low-latency messaging and real-time interaction",
    imageUrl: "/chat8-hero-1.png",
    liveLink: "https://chat8-opal.vercel.app/",
    codeLink: "https://github.com/OvaisKhanday/Chat8/",
  },
  {
    id: 3,
    title: "careTracker",
    tagLine: "A full-stack school buses management system",
    description:
      "The system leverages real-time tracking technology and a user-friendly mobile application to provide parents with the ability to monitor their child's bus location, ensuring timely and secure drop-off and pick-up. The system architecture integrates Global Positioning System (GPS) technology to enable accurate tracking of school buses.",
    imageUrl: "/caretracker-hero-1.png",
    codeLink: "https://github.com/OvaisKhanday/careTracker",
  },
  {
    id: 4,
    title: "AqwaMarq",
    tagLine: "Applying watermarks on PDFs and images",
    description: "Developed a cross-platform compatible application for applying watermarks on PDFs and pictures. ",
    imageUrl: "/aqwamarq.webp",
    codeLink: "https://github.com/OvaisKhanday/aqwamarq",
  },
  {
    id: 5,
    title: "Collaborative Whiteboard",
    tagLine: "Realtime whiteboard drawing",
    description:
      "A fullstack collaborative whiteboard with multi-room support, keycloak authentication, and realtime web-socket enabled communication.",
    imageUrl: "/whiteboard-hero-1.png",
    codeLink: "https://github.com/OvaisKhanday/whiteboard",
  },
] as const;
