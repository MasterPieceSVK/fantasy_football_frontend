import React from "react";
import type { SVGProps } from "react";

export default function FootballPlayerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={125}
      height={125}
      viewBox="0 0 32 32"
      {...props}
    >
      <circle cx={17} cy={28} r={2} fill="white"></circle>
      <path fill="white" d="M8 20.586L13.586 15L15 16.414L9.414 22z"></path>
      <path
        fill="white"
        d="M28 16.584L19.414 8H6v2h12.586l3 3L6 28.586L7.414 30L23 14.415L26.584 18L23 21.586L24.414 23L28 19.416a2.004 2.004 0 0 0 0-2.832M24.5 9A3.5 3.5 0 1 1 28 5.5A3.504 3.504 0 0 1 24.5 9m0-5A1.5 1.5 0 1 0 26 5.5A1.502 1.502 0 0 0 24.5 4"
      ></path>
    </svg>
  );
}
