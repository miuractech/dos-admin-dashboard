import React from 'react';

import Content from './content';
import styles from './styles/meta.module.scss';
import MetaTopBar from './topbar';

const Meta: React.FC = () => {
  return (
    <div className={styles['root']}>
      <MetaTopBar />
      <Content />
    </div>
  );
};

export default Meta;
