import React from 'react';
import variables from 'apps/admin-dashboard/src/utils/styles/variables';

import styles from './sidenav.module.scss';
import { ChangeSelectedSideNavItem } from './helpers';

const SideNavItem: React.FC<{
  selected: boolean;
  value: string;
  id: string;
  icon: React.FC<{ stroke: string }>;
}> = ({ selected, value, icon, id }) => {
  return (
    <div
      onClick={() => ChangeSelectedSideNavItem(id)}
      className={styles['item']}
    >
      <div></div>
      <div className={styles['item_content']}>
        <div className={styles['svg-icon-container']}>
          {icon({
            stroke: selected
              ? variables.global_selected
              : variables.gloval_white,
          })}
        </div>

        <h3
          style={{
            color: selected
              ? variables.global_selected
              : variables.gloval_white,
          }}
        >
          {value}
        </h3>
      </div>
      <div className={styles['after']}></div>
    </div>
  );
};

export default SideNavItem;
