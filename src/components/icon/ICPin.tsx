import { SVGProps } from 'react';

export const PinIcon = ({ 
  fill = 'currentColor', 
  width = '24', 
  height = '24', 
  className 
}: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="17" x2="12" y2="22"></line>
      <path d="m5 17 1.5-1.5L5 14l4-4 2 2v6l-4 4-1.5-1.5Z"></path>
      <path d="M9 11.5 6.5 9A7 7 0 0 1 17 3a7 7 0 0 1 3 13.5L17.5 14"></path>
    </svg>
  );
};

export const PinOffIcon = ({ 
  fill = 'currentColor', 
  width = '24', 
  height = '24', 
  className 
}: SVGProps<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17v5"></path>
      <path d="M9 10.2V4a2 2 0 0 1 4 0v7.4"></path>
      <path d="M11.8 2.2A2 2 0 0 1 16 4v7.4a2 2 0 0 1-.2.8L13 9.4l-2-2L8.2 4.6A2 2 0 0 1 9 4a2 2 0 0 1 2.8-1.8Z"></path>
      <path d="M2 2l20 20"></path>
    </svg>
  );
};