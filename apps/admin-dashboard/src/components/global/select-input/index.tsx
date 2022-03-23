import React from 'react';

const ApplicationSelectInput: React.FC<JSX.IntrinsicElements['select']> = ({
  ...selectProps
}) => {
  return <select {...selectProps}>{selectProps.children}</select>;
};

const ApplicationOptionElement: React.FC<JSX.IntrinsicElements['option']> = ({
  ...optionProps
}) => {
  return <option {...optionProps}>{optionProps.children}</option>;
};

const Wrapper = () => (
  <ApplicationSelectInput>
    <ApplicationOptionElement></ApplicationOptionElement>
  </ApplicationSelectInput>
);
