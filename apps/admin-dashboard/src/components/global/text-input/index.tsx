import clsx from 'clsx';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import styles from './text-input.module.scss';

const ApplicationTextInput: React.FC<{
  inputChangeFunc: UseFormRegister<any>;
  fieldName: string;
}> = (props) => {
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
        {...props.inputChangeFunc(props.fieldName)}
        onFocus={() => {
          setStyleState(containerStyle);
        }}
        onBlur={() => setStyleState(clsx(containerStyle, afterStyle))}
        autoComplete="off"
      />
    </div>
  );
};

export default ApplicationTextInput;
