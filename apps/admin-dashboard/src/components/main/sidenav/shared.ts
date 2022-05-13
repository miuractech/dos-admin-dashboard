// SideNavbar State and Behaviour Related States and Configs

import clsx from 'clsx';
import { BehaviorSubject } from 'rxjs';
import {
  CouponsGiftsIcon,
  CustomersIcon,
  LogoutIcon,
  MerchantsIcon,
  MetaIcon,
  OrdersIcon,
  ProductsIcon,
  CMIIcon
} from '@admin/assets';
import React from 'react';

import styles from './sidenav.module.scss';
import { SideNavItemObject } from '../shared';

// toggled/not-toggled styles-states of the sidenavbar
export const toggledSideNav = clsx(styles['root']);
export const notToggledSideNav = clsx(styles['root'], styles['root-toggled']);

export const rootStyle$ = new BehaviorSubject(toggledSideNav);

// Keys of SideNavItemObjects to Value for Ids of SideNavItemList
export const Keys = Object.keys(SideNavItemObject);

export const SideNavItemList: Array<{
  id: string;
  value: string;
  icon: React.FC<{ stroke: string }>;
}> = [
    {
      id: Keys[0],
      value: SideNavItemObject['ORDERS'].value,
      icon: OrdersIcon,
    },
    {
      id: Keys[1],
      value: SideNavItemObject['PRODUCTS'].value,
      icon: ProductsIcon,
    },
    {
      id: Keys[2],
      value: SideNavItemObject['MERCHANTS'].value,
      icon: MerchantsIcon,
    },
    {
      id: Keys[3],
      value: SideNavItemObject['CUSTOMERS'].value,
      icon: CustomersIcon,
    },
    {
      id: Keys[4],
      value: SideNavItemObject['META'].value,
      icon: MetaIcon,
    },
    {
      id: Keys[5],
      value: SideNavItemObject['CMI'].value,
      icon: CMIIcon,
    },
    {
      id: Keys[6],
      value: SideNavItemObject['COUPONS_AND_GIFTS'].value,
      icon: CouponsGiftsIcon,
    },
    {
      id: Keys[7],
      value: SideNavItemObject['LOGOUT'].value,
      icon: LogoutIcon,
    },
  ];
