import clsx from 'clsx';

import styles from './sidenav.module.scss';
import { Keys, rootStyle$ } from './shared';
import { selectedSideNavItem$, sideNavToggled$ } from '../shared';

// Function to Draw in or Push out the SideNav Drawer
export function Toggle() {
  if (rootStyle$.value === clsx(styles['root'])) {
    rootStyle$.next(clsx(styles['root'], styles['root-toggled']));
    sideNavToggled$.next(false);
  } else {
    rootStyle$.next(clsx(styles['root']));
    sideNavToggled$.next(true);
  }
}

export function ChangeSelectedSideNavItem(id: string) {
  if (Keys.includes(id)) {
    selectedSideNavItem$.next(id);
  }
}
