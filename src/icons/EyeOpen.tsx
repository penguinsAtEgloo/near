import type { ReactElement } from 'react';
import React from 'react';

const EyeOpen: React.FC<React.SVGProps<SVGSVGElement>> = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M26.5716 13.7025C27.1641 14.4775 27.1641 15.5238 26.5716 16.2975C24.7054 18.7338 20.2279 23.75 15.0004 23.75C9.77288 23.75 5.29538 18.7338 3.42913 16.2975C3.14086 15.9264 2.98438 15.4699 2.98438 15C2.98438 14.5301 3.14086 14.0736 3.42913 13.7025C5.29538 11.2663 9.77288 6.25 15.0004 6.25C20.2279 6.25 24.7054 11.2663 26.5716 13.7025V13.7025Z"
      stroke="black"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z"
      stroke="black"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default EyeOpen;
