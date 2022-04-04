import React from 'react';
import { useSubject } from 'rxf-rewrite/dist';

import {
  selectedSideNavItem$,
  SideNavItemObject,
  sideNavToggled$,
} from './shared';
import SideNavBar from './sidenav';

const Main: React.FC = () => {
  useSubject(selectedSideNavItem$);
  useSubject(sideNavToggled$);

  const Element = SideNavItemObject[selectedSideNavItem$.value].mainComponent;

  return (
    <>
      <SideNavBar />
      <div
        style={{
          marginLeft: sideNavToggled$.value ? 375 : 0,
          minWidth: 800,
          minHeight: 600,
          transition: 'all .5s ease-in-out',
        }}
      >
        <Element />
      </div>
    </>
  );
};

export default Main;
