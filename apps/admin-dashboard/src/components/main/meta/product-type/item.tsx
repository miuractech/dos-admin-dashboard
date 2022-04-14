import { TMetaProductType } from '../../../../Midl/meta-products/types';
import styles from '../styles/product-type.module.scss';
import React from 'react';
import ApplicationButton from '../../../global/buttons';
import ApplicationModal from '../../../global/modal';
import EditFormModal from './edit-form-modal';

const Item: React.FC<{ item: TMetaProductType }> = ({ item }) => {
  const [editedFormShow, setEditedFormShow] = React.useState(false);
  function setterEditedFormShow(val: boolean) {
    return setEditedFormShow(val);
  }

  return (
    <div>
      <div className={styles['item']}>
        <div className={styles['left']}>
          <img
            src={item.display_image}
            alt="display_image_item"
            height={56}
            width={45}
          />
          <h3>{item.name}</h3>
        </div>
        <div className={styles['right']}>
          <ApplicationButton
            variant="edit"
            clickAction={() => {
              setEditedFormShow(true);
            }}
          >
            Edit
          </ApplicationButton>
          <ApplicationButton variant="disable" clickAction={() => {}}>
            Unpublish
          </ApplicationButton>
        </div>
      </div>
      <div className={styles['footer']}></div>
      <ApplicationModal mounted={editedFormShow}>
        <EditFormModal item={item} modalAction={setterEditedFormShow} />
      </ApplicationModal>
    </div>
  );
};

export default Item;
