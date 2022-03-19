import React from 'react';

const OrdersIcon: React.FC<{ stroke: string }> = ({ stroke }) => {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 2.99995H2.5C1.94772 2.99995 1.5 3.44767 1.5 3.99995V20C1.5 20.5522 1.94772 21 2.5 21H15.5C16.0523 21 16.5 20.5522 16.5 20V3.99995C16.5 3.44767 16.0523 2.99995 15.5 2.99995Z"
        stroke={stroke}
        strokeWidth="1.41429"
        strokeLinejoin="round"
      />
      <path
        d="M5 16.5H9M6 1.00002V4.00002V1.00002ZM12 1.00002V4.00002V1.00002ZM5 8.50002H13H5ZM5 12.5H11H5Z"
        stroke={stroke}
        strokeWidth="1.41429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OrdersIcon;
