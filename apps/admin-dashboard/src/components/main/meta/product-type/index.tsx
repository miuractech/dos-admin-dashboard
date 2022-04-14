import { AddIcon } from '@admin/assets';
import React from 'react';
import { useSubject } from 'rxf-rewrite/dist';

import ApplicationButton from '../../../global/buttons';
import ApplicationModal from '../../../global/modal';
import metaStyles from '../styles/meta.module.scss';
import AddProductTypeForm from './add-form';
import ListItems from './item-list';

import { showProductAddForm$ } from './shared';

const ProductType: React.FC = () => {
  useSubject(showProductAddForm$);

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
      <ApplicationModal mounted={showProductAddForm$.value}>
        <AddProductTypeForm></AddProductTypeForm>
      </ApplicationModal>
      <ListItems />
    </div>
  );
};

export default ProductType;
