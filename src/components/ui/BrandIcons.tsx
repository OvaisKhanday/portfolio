import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
});

export function GithubIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 .5C5.65.5.5 5.65.5 12.02c0 5.1 3.29 9.42 7.86 10.94.58.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .3.21.66.8.55A11.52 11.52 0 0 0 23.5 12.02C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function XIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.86l-4.78-6.26L5.7 22H2.44l8.06-9.21L1.5 2h7.03l4.32 5.73L18.244 2Zm-1.2 18h1.91L7.05 4H5.04l12.005 16Z" />
    </svg>
  );
}
