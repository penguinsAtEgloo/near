import type { ReactElement } from 'react';
import React from 'react';

const Refresh: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      d="M18.6111 7C18.6111 7 21.4947 9.00498 23.2152 10.6338C24.9357 12.2627 26 14.5136 26 17C26 21.9706 21.7467 26 16.5 26C11.2533 26 7 21.9706 7 17C7 12.8969 9.89826 9.43511 13.8611 8.35177M18.6111 7L24.9444 7M18.6111 7L18.6111 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Refresh;
