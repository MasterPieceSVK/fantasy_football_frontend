import React from "react";
import type { SVGProps } from "react";

export default function BurgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M3 6h18M3 12h18M3 18h18"
      ></path>
    </svg>
  );
}
