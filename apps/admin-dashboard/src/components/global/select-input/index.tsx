<<<<<<< Updated upstream
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
=======
import React from 'react';

import styles from './select.module.scss';

const ApplicationSelectInput: React.FC<JSX.IntrinsicElements['select']> = ({
  ...selectProps
}) => {
  return (
    <select className={styles['select-input']} {...selectProps}>
      {selectProps.children}
    </select>
  );
};

const ApplicationOptionElement: React.FC<JSX.IntrinsicElements['option']> = ({
  ...optionProps
}) => {
  return (
    <option className={styles['option']} {...optionProps}>
      {optionProps.children}
    </option>
  );
};
export { ApplicationSelectInput, ApplicationOptionElement };
>>>>>>> Stashed changes
