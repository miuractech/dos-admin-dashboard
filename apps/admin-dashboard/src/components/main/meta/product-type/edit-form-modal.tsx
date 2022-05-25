import { CloseCircle } from '@admin/assets';
import React from 'react';
import { ButtonWithoutStyles } from '../../../global/buttons';

import styles from '../styles/product-type.module.scss';
import metaStyles from '../styles/meta.module.scss';
import { selectedEditOption$ } from './shared';
import { useSubject } from 'rxf-rewrite/dist';
import clsx from 'clsx';
import { TMetaProductType } from '../../../../Midl/meta-products/types';
import BasicInfo from './basic-info';
import ImagesByColor from './images-by-colors';
import Inventory from './inventory';

const EditModalOptions: {
  [key: string]: { val: string; element: React.FC<{ item: TMetaProductType }> };
} = {
  BASIC_INFO: {
    val: 'Basic Info',
    element: BasicInfo,
  },
  IMAGES_BY_COLORS: {
    val: 'Images',
    element: ImagesByColor,
  },
  INVENTORY: {
    val: 'Inventory',
    element: Inventory,
  },
};

const EditFormModal: React.FC<{
  item: TMetaProductType;
  modalAction: (val: boolean) => void;
}> = ({ modalAction, item }) => {
  useSubject(selectedEditOption$);
  const Element = EditModalOptions[selectedEditOption$.value].element;

  return (
    <div className={styles['edit-container']}>
      <div className={styles['close-button']}>
        <ButtonWithoutStyles
          clickAction={() => {
            modalAction(false);
          }}
        >
          <CloseCircle />
        </ButtonWithoutStyles>
      </div>
      <div style={{ padding: '1rem' }}>
        <div className={metaStyles['topbar']}>
          {Object.keys(EditModalOptions).map((item) => (
            <div
              key={item}
              className={
                selectedEditOption$.value === item
                  ? clsx(
                    metaStyles['header-text-container'],
                    metaStyles['text-after']
                  )
                  : metaStyles['header-text-container']
              }
              onClick={() => selectedEditOption$.next(item)}
            >
              <h3>{EditModalOptions[item].val}</h3>
            </div>
          ))}
        </div>
      </div>
      <Element item={item} />
    </div>
  );
};

export default EditFormModal;
