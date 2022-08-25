import type { ReactElement } from 'react';
import React from 'react';

const Close: React.FC<React.SVGProps<SVGSVGElement>> = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M22.5 7.5L7.5 22.5M7.5 7.5L22.5 22.5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Close;
