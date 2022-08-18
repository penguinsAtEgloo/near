import type { ReactElement } from 'react';
import React from 'react';

const Check: React.FC<React.SVGProps<SVGSVGElement>> = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M25 7.5L11.25 21.25L5 15"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Check;
