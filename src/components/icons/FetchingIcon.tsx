import React from "react";
import type { SVGProps } from "react";
type Icon = {
  size: number;
} & SVGProps<SVGSVGElement>;

export default function FetchingIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={18} cy={12} r={0} fill="black">
        <animate
          attributeName="r"
          begin="0.335s"
          calcMode="spline"
          dur="0.75s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={0} fill="black">
        <animate
          attributeName="r"
          begin="0.165s"
          calcMode="spline"
          dur="0.75s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle cx={6} cy={12} r={0} fill="black">
        <animate
          attributeName="r"
          begin={0}
          calcMode="spline"
          dur="0.75s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
    </svg>
  );
}
