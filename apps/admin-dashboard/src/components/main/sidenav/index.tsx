// Entry Point for the Whole SideNavbar Component

import React from 'react';

import styles from './sidenav.module.scss';
import Header from './header';
import SideNavItem from './item';
import { rootStyle$, SideNavItemList } from './shared';
import { selectedSideNavItem$ } from '../shared';
import { useSubject } from 'rxf-rewrite/dist';

const SideNavBar: React.FC = () => {
  useSubject(rootStyle$);
  useSubject(selectedSideNavItem$);

  return (
    <div className={rootStyle$.value}>
      <Header />
      <div className={styles['item_wrapper']}>
        {SideNavItemList.map((item) => (
          <SideNavItem
            key={item.id}
            id={item.id}
            value={item.value}
            icon={item.icon}
            selected={selectedSideNavItem$.value === item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
