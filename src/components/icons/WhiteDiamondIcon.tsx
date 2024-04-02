import React from "react";
import type { SVGProps } from "react";

type WhiteDiamondIcon = {
  size: number;
} & SVGProps<SVGSVGElement>;

export default function WhiteDiamondIcon(props: WhiteDiamondIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path
          d="M10.6364 5H37.3636L45 18.3L24 43L3 18.3L10.6364 5Z"
          clipRule="evenodd"
        ></path>
        <path d="M10.6362 5L23.9999 43L37.3635 5"></path>
        <path d="M3 18.3H45"></path>
        <path d="M15.4092 18.3L24.0001 5L32.591 18.3"></path>
      </g>
    </svg>
  );
}
