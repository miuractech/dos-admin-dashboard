import React from 'react';
import variables from '../../../utils/styles/variables';

import styles from './sidenav.module.scss';
import { ChangeSelectedSideNavItem } from './helpers';
import { useNavigate } from 'react-router-dom';

const SideNavItem: React.FC<{
  selected: boolean;
  value: string;
  id: string;
  icon: React.FC<{ stroke: string }>;
}> = ({ selected, value, icon, id }) => {
  const navigate = useNavigate();

  const nav = () => {
    switch (id) {
      case 'ORDERS':
        navigate('/orders');
        break;
      case 'PRODUCTS':
        navigate('/products');
        break;
      case 'MERCHANTS':
        navigate('/merchants');
        break;
      case 'CUSTOMERS':
        navigate('/customers');
        break;
      case 'META':
        navigate('/meta');
        break;
      case 'COUPONS_AND_GIFTS':
        navigate('/couponsgifts');
        break;
      case 'LOGOUT':
        navigate('/logout');
    }
  };

  return (
    <div
      onClick={() => {
        nav();
        ChangeSelectedSideNavItem(id);
      }}
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
