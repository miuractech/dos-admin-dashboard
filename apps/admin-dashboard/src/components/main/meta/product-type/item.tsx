import { TMetaProductType } from '../../../../Midl/meta-products/types';
import styles from '../styles/product-type.module.scss';
import React from 'react';
import ApplicationButton from '../../../global/buttons';
import ApplicationModal from '../../../global/modal';
import EditFormModal from './edit-form-modal';
import { useDispatch } from 'react-redux';
import {
  setEditedMetaProductType,
  setMetaProductTypeEditError,
} from '../../../../Midl/meta-products/store/meta-product.type.slice';
import { productTypeRepo } from '../../../../Midl/meta-products/hooks/product-type/helpers';
import { ApplicationErrorHandler } from 'rxf-rewrite/dist';

const Item: React.FC<{ item: TMetaProductType }> = ({ item }) => {
  const [editedFormShow, setEditedFormShow] = React.useState(false);
  function setterEditedFormShow(val: boolean) {
    return setEditedFormShow(val);
  }
  const dispatch = useDispatch();

  function updateState(res: TMetaProductType | ApplicationErrorHandler) {
    if (res instanceof ApplicationErrorHandler) {
      dispatch(setMetaProductTypeEditError(res.errorObject));
    } else {
      dispatch(setEditedMetaProductType(res));
      dispatch(setMetaProductTypeEditError(null));
    }
  }

  return (
    <React.Fragment>
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
          {item.status === 'published' && (
            <ApplicationButton
              variant="disable"
              clickAction={async () => {
                const res = await productTypeRepo.updateOne(
                  { status: 'unpublished' },
                  item.id
                );
                updateState(res);
              }}
            >
              Unpublish
            </ApplicationButton>
          )}
          {item.status === 'unpublished' && (
            <ApplicationButton
              variant="enable"
              clickAction={async () => {
                const res = await productTypeRepo.updateOne(
                  { status: 'published' },
                  item.id
                );
                updateState(res);
              }}
            >
              Publish
            </ApplicationButton>
          )}
        </div>
      </div>
      <div className={styles['footer']}></div>
      <ApplicationModal mounted={editedFormShow}>
        <EditFormModal item={item} modalAction={setterEditedFormShow} />
      </ApplicationModal>
    </React.Fragment>
  );
};

export default Item;
