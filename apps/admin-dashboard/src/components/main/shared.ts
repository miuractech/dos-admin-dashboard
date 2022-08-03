import { BehaviorSubject } from 'rxjs';
import Meta from './meta';
import { CMI } from '../Options/CMI';
import { Coupons } from '../Options/c&g';
import { Customers } from '../Options/coustomers';
import { Logout } from '../Options/logout';
import { Merchants } from '../Options/merchents';
import { Orders } from '../Options/orders/orders';
import { Products } from '../Options/products';
import { Location } from '../Options/Location/location';

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
  CMI: { value: 'CMI', mainComponent: CMI },
  LOCATION: { value: "Location", mainComponent: Location },
  COUPONS_AND_GIFTS: { value: 'Coupons and Gifts', mainComponent: Coupons },
  LOGOUT: { value: 'Logout', mainComponent: Logout },
};
