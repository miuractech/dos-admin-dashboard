import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useSubject } from 'rxf-rewrite/dist';
import { CMI } from '../Options/CMI';
import { Coupons } from '../Options/c&g';
import styles from './meta/styles/meta.module.scss';

import {
  selectedSideNavItem$,
  SideNavItemObject,
  sideNavToggled$,
} from './shared';
import SideNavBar from './sidenav';
import { Orders } from '../Options/orders';
import { Products } from '../Options/products';
import { Merchants } from '../Options/merchents';
import { Customers } from '../Options/coustomers';
import { Meta } from '../Options/meta';
import { Logout } from '../Options/logout';
import { Fonts } from '../Options/CMI/fonts/fonts';
import { Art } from '../Options/CMI/art/art';
import { Location } from '../Options/Location/location';

const Main: React.FC = () => {
  useSubject(selectedSideNavItem$);
  useSubject(sideNavToggled$);

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
          <Route path="/cmi" element={<CMI />} >
            <Route path="/cmi/font" element={<Fonts />} />
            <Route path="/cmi/art" element={<Art />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
