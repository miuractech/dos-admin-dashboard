import React from 'react';
import { CrossButton } from '../buttons';

import styles from './capsule.module.scss';

const ApplicationCapsule: React.FC<{
  val: string;
  fontColor?: string;
  clickAction: (val: string) => void;
}> = ({ val, clickAction, fontColor }) => {
  const color = fontColor !== undefined ? fontColor : 'black';

  return (
    <div className={styles['container']}>
      <p style={{ color: color }}>{val}</p>
      <CrossButton clickAction={() => clickAction(val)} />
    </div>
  );
};

export default ApplicationCapsule;
