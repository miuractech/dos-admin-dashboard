import React from 'react';

const DropoutStoreLogo: React.FC<{ height: number; width: number }> = (
  props
) => {
  return (
    <svg
      width={props.height}
      height={props.width}
      viewBox="0 0 25 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0596 0.645477L23.525 5.99909L19.8193 8.94099L12.8424 5.37191L13.0596 0.645477Z"
        fill="#3F8CFF"
      />
      <path
        d="M1.06738 6.11761L11.3995 0.51116L11.7315 5.23092L4.84342 8.96856L1.06738 6.11761Z"
        fill="#FF2C91"
        fillOpacity="0.94"
      />
      <path
        d="M24.5576 7.65598V19.4112L20.2509 17.452V9.61518L24.5576 7.65598Z"
        fill="#00DB3A"
      />
      <path
        d="M0 19.4113L0 7.65609L4.30672 9.61529V17.4521L0 19.4113Z"
        fill="#3F8CFF"
      />
      <path
        d="M11.1523 26.5541L0.917899 20.7712L4.74229 17.9855L11.5653 21.8407L11.1523 26.5541Z"
        fill="#FFC90A"
      />
      <path
        d="M23.5488 21.2218L13.1906 26.78L12.8807 22.0587L19.7861 18.3533L23.5488 21.2218Z"
        fill="#FF002E"
      />
      <path
        d="M12.2666 5.74173L19.5052 9.64911V17.4639L12.2666 21.3713L5.02802 17.4639L5.02802 9.64911L12.2666 5.74173Z"
        fill="#292931"
      />
    </svg>
  );
};

export default DropoutStoreLogo;
