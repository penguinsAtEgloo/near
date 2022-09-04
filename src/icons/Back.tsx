import type { ReactElement } from 'react';
import React from 'react';

const Back: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
  >
    <path
      d="M22.5104 7.927L20.6667 6.08325L10.25 16.4999L20.6667 26.9166L22.5104 25.0728L13.9375 16.4999L22.5104 7.927Z"
      fill="black"
    />
  </svg>
);

export default Back;
