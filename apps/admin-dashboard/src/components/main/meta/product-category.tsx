import React from 'react';
import * as yup from 'yup';
import { BehaviorSubject } from 'rxjs';
import useGetCategories from '../../../Midl/meta-products/hooks/category/get-categories';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import _ from 'lodash';

import styles from './styles/meta.module.scss';
import ApplicationButton, { ButtonWithoutStyles } from '../../global/buttons';
import { AddIcon, CloseCircle } from '@admin/assets';
import {
  TMetaProductCategory,
  TMetaProductFamily,
} from '../../../Midl/meta-products/types';
import clsx from 'clsx';
import { Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';
import useUpdateCategory from '../../../Midl/meta-products/hooks/category/update-category';
import ApplicationModal from '../../global/modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ApplicationTextInput from '../../global/text-input';
import InfoText from '../../global/info-text';
import ApplicationSpinner from '../../global/spinner';
import useAddCategory from '../../../Midl/meta-products/hooks/category/add-category';
import { orderBy } from 'firebase/firestore';
import { PRODUCT_CATEGORY_DND_ID } from '../../../utils/settings';
import {
  setDndCategory,
  setMetaProductCategoriesAfterReorder,
  setMetaProductCategoriesByFamily,
  setRestoreCategoryBeforeDnd,
} from '../../../Midl/meta-products/store/meta-product.category.slice';
import { batchCommitCategory } from '../../../Midl/meta-products/hooks/category/helpers-category';
import { TApplicationErrorObject, useSubject } from 'rxf-rewrite/dist';

const selectedProductFamily$ = new BehaviorSubject<TMetaProductFamily | null>(
  null
);
const showAddForm$ = new BehaviorSubject(false);

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(12),
});

const ProductCategory: React.FC = () => {
  useSubject(showAddForm$);
  useSubject(selectedProductFamily$);
  const { getCategories, loadingFlag } = useGetCategories(true);
  const productFamilies = useSelector(
    (state: RootState) => state.metaProductFamily.metaProductFamilies
  );
  const {
    metaProductCategories,
    metaProductCategoriesByFamily,
    dndInit,
    addError,
  } = useSelector((state: RootState) => state.metaProductCategory);
  const dnd = dndInit === 'initialize' || dndInit === 'continue';
  const dispatch = useDispatch();

  const {
    addNewCategory,
    completed,
    completedSetter,
    loadingFlag: addCategoryLoadingFlag,
  } = useAddCategory(showAddForm$.value);

  React.useEffect(() => {
    metaProductCategories.length === 0 && getCategories([orderBy('index')]);
    productFamilies.length > 0 &&
      selectedProductFamily$.next(productFamilies[0]);
  }, []);

  React.useEffect(() => {
    const filtered = metaProductCategories.filter(
      (a) => a.familyId === selectedProductFamily$.value?.id
    );
    dispatch(setMetaProductCategoriesByFamily(_.orderBy(filtered, 'index')));
  }, [selectedProductFamily$.value, metaProductCategories]);

  return (
    <div className={styles['root-content']}>
      <div className={styles['heading']}>
        <div></div>
        <h2>Product Category</h2>
        <ApplicationButton
          variant="default"
          clickAction={() => {
            showAddForm$.next(true);
            completedSetter(false);
          }}
          disabled={selectedProductFamily$.value === null}
        >
          <AddIcon /> <span>Add Category</span>
        </ApplicationButton>
      </div>
      <div className={styles['selector-container']}>
        <div className={styles['product-family-selector']}>
          {productFamilies.map((f) => (
            <div
              key={f.id}
              onClick={() => {
                dispatch(setRestoreCategoryBeforeDnd());
                selectedProductFamily$.next(f);
              }}
              className={
                selectedProductFamily$.value?.name === f.name
                  ? clsx([
                      styles['text-container'],
                      styles['text-after-selector'],
                    ])
                  : styles['text-container']
              }
            >
              <h4
                style={{
                  fontWeight:
                    selectedProductFamily$.value?.name === f.name
                      ? 'bold'
                      : 'normal',
                }}
              >
                {f.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
      {dnd && (
        <div className={styles['dnd-container']}>
          <div className={styles['inner']}>
            <div style={{ height: 35, width: 80 }}>
              <ApplicationButton
                variant="disable"
                clickAction={() => {
                  dispatch(setRestoreCategoryBeforeDnd());
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
                  produce(metaProductCategoriesByFamily, (draft) =>
                    batchCommitCategory(draft, 'Somnath').then(() => {
                      dispatch(setDndCategory('default'));
                      dispatch(setMetaProductCategoriesAfterReorder());
                    })
                  );
                }}
                dimension={{ height: '100%', width: '100%' }}
              >
                Save
              </ApplicationButton>
            </div>
          </div>
        </div>
      )}
      <Droppable droppableId={PRODUCT_CATEGORY_DND_ID}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles['list']}
          >
            {metaProductCategoriesByFamily.map((c) => (
              <Draggable
                key={c.id}
                draggableId={`draggable ${c.id}`}
                index={c.index}
              >
                {(provided, snapshot) => (
                  <List category={c} provided={provided} />
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      <ApplicationModal mounted={showAddForm$.value}>
        <Form
          dbError={addError}
          onCompleteText={'Product Category Has been Successfully Created!'}
          unmountFunc={() => showAddForm$.next(false)}
          submitFormFunc={(name: string) => {
            selectedProductFamily$.value !== null &&
              addNewCategory(
                {
                  name: name,
                  createdBy: 'Somnath',
                  familyId: selectedProductFamily$.value?.id,
                },
                uuidv4()
              );
          }}
          loadingFlag={addCategoryLoadingFlag}
          completed={completed}
        />
      </ApplicationModal>
    </div>
  );
};

const List: React.FC<{
  category: TMetaProductCategory;
  provided: DraggableProvided;
}> = ({ category, provided }) => {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const dbError = useSelector(
    (state: RootState) => state.metaProductCategory.editError
  );
  const {
    updateCategoryName,
    loadingFlag,
    completed,
    completedSetter,
    publishCategory,
    unPublishCategory,
  } = useUpdateCategory(showEditForm);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={styles['list-content']}
    >
      <div className={styles['main']}>
        <h3>{category.name}</h3>
        <div className={styles['button-container']}>
          <ApplicationButton
            clickAction={() => {
              setShowEditForm(true);
              completedSetter(false);
            }}
            variant="edit"
          >
            Edit
          </ApplicationButton>
          {category.status === 'published' && (
            <ApplicationButton
              clickAction={() => {
                unPublishCategory(category.id);
              }}
              variant="disable"
              disabled={loadingFlag}
            >
              Unpublish
            </ApplicationButton>
          )}
          {category.status === 'unpublished' && (
            <ApplicationButton
              clickAction={() => {
                publishCategory(category.id);
              }}
              variant="enable"
              disabled={loadingFlag}
            >
              Publish
            </ApplicationButton>
          )}
        </div>
      </div>
      <div className={styles['footer']}></div>
      <ApplicationModal mounted={showEditForm}>
        <Form
          dbError={dbError}
          onCompleteText={'Changes Have Been Saved Successfully!'}
          unmountFunc={() => setShowEditForm(false)}
          submitFormFunc={(name: string) =>
            updateCategoryName(
              { name: name, updatedBy: 'Somnath', familyId: category.familyId },
              category.id
            )
          }
          completed={completed}
          productCategoryNameDefaultValue={category.name}
          loadingFlag={loadingFlag}
        />
      </ApplicationModal>
    </div>
  );
};

const Form: React.FC<{
  unmountFunc: () => void;
  submitFormFunc: (name: string) => void;
  loadingFlag: boolean;
  completed: boolean;
  dbError: TApplicationErrorObject | null;
  onCompleteText: string;
  productCategoryNameDefaultValue?: string;
}> = ({
  unmountFunc,
  submitFormFunc,
  loadingFlag,
  completed,
  dbError,
  productCategoryNameDefaultValue,
  onCompleteText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ resolver: yupResolver(validationSchema) });

  function submit(data: { name: string }) {
    submitFormFunc(data.name);
  }

  return (
    <div className={styles['product-form']}>
      <div className={styles['product-form-heading']}>
        <div></div>
        <h3>Product Category</h3>
        <ButtonWithoutStyles clickAction={() => unmountFunc()}>
          <CloseCircle />
        </ButtonWithoutStyles>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className={styles['product-form-body']}>
          <label>Category Name:</label>
          <div>
            <ApplicationTextInput
              defaultValue={productCategoryNameDefaultValue}
              {...register('name')}
            />
            <InfoText
              text={
                errors.name?.message !== undefined ? errors.name.message : ''
              }
              fontFamily="Montserrat"
              variant="error"
            />
            <InfoText
              text={dbError !== null ? dbError.message : ''}
              fontFamily="Montserrat"
              variant="error"
            />
          </div>
        </div>
        <div
          className={
            loadingFlag
              ? clsx(
                  styles['form-button-container'],
                  styles['form-button-container-loading']
                )
              : styles['form-button-container']
          }
        >
          {loadingFlag ? (
            <ApplicationSpinner />
          ) : (
            <>
              <div style={{ height: 50, width: 100 }}>
                <ApplicationButton
                  variant="cancel"
                  clickAction={() => unmountFunc()}
                  dimension={{ height: '100%', width: '100%' }}
                >
                  Cancel
                </ApplicationButton>
              </div>
              <div style={{ height: 50, width: 100 }}>
                <ApplicationButton
                  variant="default-not-padding"
                  clickAction={handleSubmit(submit)}
                  dimension={{ height: '100%', width: '100%' }}
                >
                  Save
                </ApplicationButton>
              </div>
            </>
          )}
        </div>
      </form>
      {completed && (
        <InfoText
          text={onCompleteText}
          fontFamily="Montserrat"
          variant="success"
        />
      )}
    </div>
  );
};

export default ProductCategory;
