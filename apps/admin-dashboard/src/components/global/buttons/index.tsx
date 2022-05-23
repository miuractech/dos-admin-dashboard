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
  disabled?: boolean;
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
  disabled,
}) => {
  const styleObject = dimension !== undefined ? dimension : {};

  return (
    <button
      style={styleObject}
      onClick={() => clickAction()}
      className={buttonObject[variant]}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 *
 * ButtonWithoutStyles
 *
 */
export const ButtonWithoutStyles: React.FC<{
  clickAction: () => void;
  disabled?: boolean;
}> = (props) => {
  return (
    <button
      onClick={() => props.clickAction()}
      className={styles['button-without-styles']}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export const UploadButton: React.FC<{
  clickAction: (e:unknown) => void;
  disabled?: boolean;
  dimension?: {
    height: string;
    width: string;
  };
}> = (props) => {
  const styleObject = props.dimension !== undefined ? props.dimension : {};
  return (
    <button
      style={styleObject}
      onClick={(e) => {
        e.preventDefault()
        props.clickAction(e)
      }}
      className={styles['upload-button']}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export const CrossButton: React.FC<{ clickAction: () => void }> = ({
  clickAction,
}) => {
  return <button className={styles['cross-button']} onClick={clickAction} />;
};

export default ApplicationButton;
