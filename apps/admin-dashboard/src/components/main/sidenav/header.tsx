// Dropout Store SideNav Header Component

import React from 'react';
import { DropoutStoreLogo } from '@admin/assets';

import { Toggle } from './helpers';
import styles from './sidenav.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['content']}>
        <DropoutStoreLogo height={30} width={30} />
        <h2 className={styles['first']}>Dropout</h2>
        <h2 className={styles['second']}>Store</h2>
      </div>
      <div className={styles['toggle']} onClick={() => Toggle()}></div>
    </div>
  );
};

export default Header;
