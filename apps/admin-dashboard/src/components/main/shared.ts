import { BehaviorSubject } from 'rxjs';
import Meta from './meta';
import {
  Coupons,
  Customers,
  Logout,
  Merchants,
  Orders,
  Products,
} from './sidenav/mock';

// To Control the State of Selected SideNav Item
export const selectedSideNavItem$ = new BehaviorSubject('META');
export const sideNavToggled$ = new BehaviorSubject(true);

// Constants for SideNavItems
export const SideNavItemObject: {
  [key: string]: { value: string; mainComponent: React.FC };
} = {
  ORDERS: { value: 'Orders', mainComponent: Orders },
  PRODUCTS: { value: 'Products', mainComponent: Products },
  MERCHANTS: { value: 'Merchants', mainComponent: Merchants },
  CUSTOMERS: { value: 'Customers', mainComponent: Customers },
  META: { value: 'Meta', mainComponent: Meta },
  COUPONS_AND_GIFTS: { value: 'Coupons and Gifts', mainComponent: Coupons },
  LOGOUT: { value: 'Logout', mainComponent: Logout },
};
