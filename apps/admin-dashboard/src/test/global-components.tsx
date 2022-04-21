import { ApplicationButton } from '@dos/global';
import React from 'react';

const GlobalComponents: React.FC = () => {
  return (
    <>
      <p style={{ fontFamily: 'Montserrat' }}>Hello</p>
      <p style={{ fontFamily: 'Lufga' }}>Hello</p>
      <ApplicationButton
        variant="default"
        clickAction={() => {
          return;
        }}
      >
        Click
      </ApplicationButton>
      <ApplicationButton
        variant="default"
        clickAction={() => {
          return;
        }}
      >
        Click
      </ApplicationButton>
    </>
  );
};

export default GlobalComponents;
