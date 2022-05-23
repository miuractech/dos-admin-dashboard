import { AddIcon } from '@admin/assets';
import { RootState } from '../../../../store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubject } from 'rxf-rewrite/dist';
import ApplicationButton from '../../../global/buttons';
import metaStyles from '../styles/meta.module.scss';
import AddProductTypeForm from './add-form';
import ListItems from './item-list';
import styles from '../styles/meta.module.scss';
import { showProductAddForm$ } from './shared';
import {
  setDndType,
  setRestoreBeforeDnd,
} from '../../../../Midl/meta-products/store/meta-product.type.slice';
import produce from 'immer';
import { batchCommitTypes } from '../../../../Midl/meta-products/hooks/product-type/helpers';
import { Typography } from '@mui/material';
import SimpleModal from '../../../global/simpleModal/modal';

const ProductType: React.FC = () => {
  useSubject(showProductAddForm$);
  const types = useSelector((state: RootState) => state.metaProductType);
  const dispatch = useDispatch();
  const dndInit =
    types.dndInit === 'initialize' || types.dndInit === 'continue';

  return (
    <div className={metaStyles['root-content']}>
      <div className={metaStyles['heading']}>
        <div></div>
        <h2>Product Type</h2>
        <ApplicationButton
          clickAction={() => {
            showProductAddForm$.next(true);
          }}
          variant="default"
        >
          <AddIcon /> Add Type
        </ApplicationButton>
      </div>
      {dndInit && (
        <div className={styles['dnd-container']}>
          <div className={styles['inner']}>
            <Typography  >
              Save the changes
            </Typography>
            <div style={{ height: 35, width: 80 }}>
              <ApplicationButton
                variant="disable"
                clickAction={() => {
                  dispatch(setRestoreBeforeDnd());
                }}
                dimension={{ height: '100%', width: '100%' }}
              >
                Cancel
              </ApplicationButton>
            </div>
            <div style={{ height: 35, width: 80 }}>
              <ApplicationButton
                variant="enable"
                clickAction={() => {
                  produce(types.metaProductTypes, (draft) =>
                    batchCommitTypes(draft, 'Somnath')
                  );
                  dispatch(setDndType('default'));
                }}
                dimension={{ height: '100%', width: '100%' }}
              >
                Save
              </ApplicationButton>
            </div>
          </div>
        </div>
      )}
      <SimpleModal open={showProductAddForm$.value} onClose={() => showProductAddForm$.next(false)} style={{}}>
        <AddProductTypeForm />
      </SimpleModal>
      <ListItems />
    </div>
  );
};

export default ProductType;
