import clsx from 'clsx';
import React from 'react';

import styles from './modal.module.scss';

const ApplicationModal: React.FC<{ mounted: boolean }> = (props) => {
  return (
    <div
      className={
        props.mounted
          ? clsx(styles['modal-mounted'], styles['modal'])
          : styles['modal']
      }
    >
      {props.mounted ? props.children : null}
    </div>
  );
};

export default ApplicationModal;
