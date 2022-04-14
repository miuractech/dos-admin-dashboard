import variables from '../../../utils/styles/variables';
import React from 'react';

type TVariant = 'error' | 'success';

const colorObject = {
  error: variables.global_error_text,
  success: variables.global_success_text,
};

const InfoText: React.FC<{
  text: string;
  fontFamily: string;
  variant: TVariant;
}> = ({ text, fontFamily, variant }) => {
  return (
    <span
      style={{
        fontFamily: fontFamily,
        fontSize: 13,
        fontWeight: 500,
        color: colorObject[variant],
        margin: 0,
      }}
    >
      {text}
    </span>
  );
};

export default InfoText;
