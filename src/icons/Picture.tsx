import type { ReactElement } from 'react';
import React from 'react';

const Picture: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}): ReactElement => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10.8C7 9.79218 7.40036 8.82563 8.11299 8.11299C8.82563 7.40036 9.79218 7 10.8 7H22.2C23.2078 7 24.1744 7.40036 24.887 8.11299C25.5996 8.82563 26 9.79218 26 10.8V22.2C26 23.2078 25.5996 24.1744 24.887 24.887C24.1744 25.5996 23.2078 26 22.2 26H10.8C9.79218 26 8.82563 25.5996 8.11299 24.887C7.40036 24.1744 7 23.2078 7 22.2V10.8Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.1748 15.55C14.4865 15.55 15.5498 14.4867 15.5498 13.175C15.5498 11.8634 14.4865 10.8 13.1748 10.8C11.8631 10.8 10.7998 11.8634 10.7998 13.175C10.7998 14.4867 11.8631 15.55 13.1748 15.55Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8995 17.09L10.7998 26.0001H22.3262C23.3005 26.0001 24.2349 25.613 24.9238 24.9241C25.6128 24.2352 25.9998 23.3007 25.9998 22.3264V22.2001C25.9998 21.7574 25.8336 21.5873 25.5343 21.2596L21.7058 17.0843C21.5274 16.8897 21.3103 16.7344 21.0685 16.6283C20.8267 16.5222 20.5654 16.4677 20.3014 16.4683C20.0373 16.4688 19.7763 16.5244 19.5349 16.6314C19.2936 16.7385 19.0771 16.8947 18.8995 17.09V17.09Z"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Picture;
