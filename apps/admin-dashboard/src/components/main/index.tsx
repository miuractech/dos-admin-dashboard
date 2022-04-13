import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSubject } from 'rxf-rewrite/dist';
import { Coupons } from '../pages/c&g';
import { Customers } from '../pages/coustomers';
import { Logout } from '../pages/logout';
import { Merchants } from '../pages/merchents';
import { Meta } from '../pages/meta';
import { Orders } from '../pages/orders';
import { Products } from '../pages/products';

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
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/meta" element={<Meta />} />
          <Route path="/couponsgifts" element={<Coupons />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
