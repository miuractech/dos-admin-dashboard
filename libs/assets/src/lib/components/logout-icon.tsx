import React from 'react';

const LogoutIcon: React.FC<{ stroke: string }> = ({ stroke }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1036_112)">
        <path
          d="M4.5 22.5H13.5C13.8977 22.4996 14.279 22.3414 14.5602 22.0602C14.8414 21.779 14.9996 21.3977 15 21V18.75H13.5V21H4.5V3H13.5V5.25H15V3C14.9996 2.6023 14.8414 2.221 14.5602 1.93978C14.279 1.65856 13.8977 1.5004 13.5 1.5H4.5C4.1023 1.5004 3.721 1.65856 3.43978 1.93978C3.15856 2.221 3.0004 2.6023 3 3V21C3.0004 21.3977 3.15856 21.779 3.43978 22.0602C3.721 22.3414 4.1023 22.4996 4.5 22.5Z"
          fill={stroke}
        />
        <path
          d="M18.712 15.4395L21.4015 12.75H10.7725V11.25H21.4015L18.712 8.5605L19.7725 7.5L24.2725 12L19.7725 16.5L18.712 15.4395Z"
          fill={stroke}
        />
      </g>
      <defs>
        <clipPath id="clip0_1036_112">
          <rect width="24" height="24" fill={stroke} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoutIcon;
