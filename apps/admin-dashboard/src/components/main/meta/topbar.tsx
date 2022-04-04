import clsx from 'clsx';
import React from 'react';
import { useSubject } from 'rxf-rewrite';
import { metaTopbarObject, selectedMetaOption$ } from './shared';

import styles from './styles/meta.module.scss';

const MetaTopBar: React.FC = () => {
  useSubject(selectedMetaOption$);

  return (
    <div className={styles['topbar']}>
      {Object.keys(metaTopbarObject).map((item) => (
        <div
          key={item}
          className={
            selectedMetaOption$.value === item
              ? clsx(styles['header-text-container'], styles['text-after'])
              : styles['header-text-container']
          }
          onClick={() => selectedMetaOption$.next(item)}
        >
          <h3>{metaTopbarObject[item].value}</h3>
        </div>
      ))}
    </div>
  );
};

export default MetaTopBar;
