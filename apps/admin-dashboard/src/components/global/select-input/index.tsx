import React from 'react';

import styles from './select.module.scss';

const ApplicationSelectInput = React.forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>((props, ref) => {
  return (
    <select className={styles['select-input']} ref={ref} {...props}>
      {props.children}
    </select>
  );
});

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
