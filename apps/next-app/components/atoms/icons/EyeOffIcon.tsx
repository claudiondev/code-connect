import { SVGProps } from "react";

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a17.6 17.6 0 0 1-2.34 3.32M6.61 6.61C3.9 8.32 2 12 2 12s4 7 11 7a10.6 10.6 0 0 0 4.39-.93" />
      <path d="M2 2l20 20" />
    </svg>
  );
}
