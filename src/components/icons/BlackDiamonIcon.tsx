import React from "react";
import type { SVGProps } from "react";

type BlackDiamondIcon = {
  size: number;
} & SVGProps<SVGSVGElement>;

export default function BlackDiamondIcon(props: BlackDiamondIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m35.42 188.21l207.75 269.46a16.17 16.17 0 0 0 25.66 0l207.75-269.46a16.52 16.52 0 0 0 .95-18.75L407.06 55.71A16.22 16.22 0 0 0 393.27 48H118.73a16.22 16.22 0 0 0-13.79 7.71L34.47 169.46a16.52 16.52 0 0 0 .95 18.75M48 176h416"
      ></path>
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m400 64l-48 112l-96-128M112 64l48 112l96-128m0 400l-96-272m96 272l96-272"
      ></path>
    </svg>
  );
}
