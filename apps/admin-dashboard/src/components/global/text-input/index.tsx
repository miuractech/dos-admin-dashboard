import clsx from 'clsx';
import React from 'react';

import styles from './text-input.module.scss';

const ApplicationTextInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>((props, ref) => {
  const containerStyle = styles['text-input-container'];
  const afterStyle = styles['not-hidden'];
  const [styleState, setStyleState] = React.useState(
    clsx(containerStyle, afterStyle)
  );

  return (
    <div className={styleState}>
      <input
        size={50}
        className={styles['text-input']}
        {...props}
        ref={ref}
        onFocus={() => {
          setStyleState(containerStyle);
        }}
        defaultValue={props.defaultValue}
        onBlur={() => setStyleState(clsx(containerStyle, afterStyle))}
        autoComplete="off"
      />
    </div>
  );
});

export default ApplicationTextInput;
