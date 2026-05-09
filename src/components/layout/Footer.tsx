import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "../../lib/personal";
import { GithubIcon, XIcon } from "../ui/BrandIcons";

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: PERSONAL.socials.github, label: "GitHub" },
  { icon: Linkedin, href: PERSONAL.socials.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: PERSONAL.socials.twitter, label: "X" },
  { icon: Mail, href: PERSONAL.socials.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="container-page py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">
              © {new Date().getFullYear()} — {PERSONAL.name}
            </p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Engineered and shipped with care. Open to opportunities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                data-cursor="hover"
                className="group grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-muted transition hover:border-accent hover:text-fg"
              >
                <Icon size={16} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <a
            href="#top"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted transition hover:text-fg"
          >
            Back to top
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            Built with React · Vite · GSAP · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
