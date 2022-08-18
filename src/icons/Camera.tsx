import type { ReactElement } from 'react';
import React from 'react';

const Camera: React.FC<React.SVGProps<SVGSVGElement>> = ({}): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <g filter="url(#filter0_d_68_1019)">
      <path
        d="M5.5 10.4715C5.5 10.0336 5.5 9.81468 5.51827 9.63026C5.6945 7.85159 7.10159 6.4445 8.88026 6.26827C9.06468 6.25 9.29545 6.25 9.75698 6.25C9.93482 6.25 10.0237 6.25 10.0992 6.24543C11.0633 6.18704 11.9074 5.5786 12.2677 4.6825C12.2959 4.61232 12.3223 4.53321 12.375 4.375C12.4277 4.21679 12.4541 4.13768 12.4823 4.0675C12.8426 3.1714 13.6867 2.56296 14.6508 2.50457C14.7263 2.5 14.8097 2.5 14.9764 2.5H21.0236C21.1903 2.5 21.2737 2.5 21.3492 2.50457C22.3133 2.56296 23.1574 3.1714 23.5177 4.0675C23.5459 4.13768 23.5723 4.21679 23.625 4.375C23.6777 4.53321 23.7041 4.61232 23.7323 4.6825C24.0926 5.5786 24.9367 6.18704 25.9008 6.24543C25.9763 6.25 26.0652 6.25 26.243 6.25C26.7046 6.25 26.9353 6.25 27.1197 6.26827C28.8984 6.4445 30.3055 7.85159 30.4817 9.63026C30.5 9.81468 30.5 10.0336 30.5 10.4715V20.25C30.5 22.3502 30.5 23.4003 30.0913 24.2025C29.7317 24.9081 29.1581 25.4817 28.4525 25.8413C27.6503 26.25 26.6002 26.25 24.5 26.25H11.5C9.3998 26.25 8.3497 26.25 7.54754 25.8413C6.84193 25.4817 6.26825 24.9081 5.90873 24.2025C5.5 23.4003 5.5 22.3502 5.5 20.25V10.4715Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 20.625C20.7614 20.625 23 18.3864 23 15.625C23 12.8636 20.7614 10.625 18 10.625C15.2386 10.625 13 12.8636 13 15.625C13 18.3864 15.2386 20.625 18 20.625Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_68_1019"
        x="-1"
        y="0"
        width="38"
        height="38"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_68_1019"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_68_1019"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default Camera;
