import React from 'react';

import styles from './buttons.module.scss';

interface IButton {
  variant:
    | 'edit'
    | 'cancel'
    | 'disable'
    | 'enable'
    | 'default'
    | 'default-not-padding';
  clickAction: () => void;
  dimension?: {
    height: string;
    width: string;
  };
}

const buttonObject: { [key: string]: string } = {
  edit: styles['edit'],
  cancel: styles['cancel'],
  disable: styles['disable'],
  default: styles['default'],
  enable: styles['enable'],
  'default-not-padding': styles['default-not-padding'],
};

const ApplicationButton: React.FC<IButton> = ({
  children,
  variant,
  clickAction,
  dimension,
}) => {
  const styleObject = dimension !== undefined ? dimension : {};

  return (
    <button style={styleObject}  onClick={() => clickAction()} className={buttonObject[variant]}>
      {children}
    </button>
  );
};

const ButtonWithoutStyles: React.FC<{ clickAction: () => void }> = (props) => {
  return (
    <button
      onClick={() => props.clickAction()}
      className={styles['button-without-styles']}
    >
      {props.children}
    </button>
  );
};

export default ApplicationButton;
export { ButtonWithoutStyles };
