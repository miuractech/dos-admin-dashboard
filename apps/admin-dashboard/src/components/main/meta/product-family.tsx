import { AddIcon, CloseCircle } from '@admin/assets';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BehaviorSubject } from 'rxjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import useAddFamily from 'apps/admin-dashboard/src/Midl/meta-products/hooks/family/add-family';
import useUpdateFamily from 'apps/admin-dashboard/src/Midl/meta-products/hooks/family/update-family';
import { TMetaProductFamily } from 'apps/admin-dashboard/src/Midl/meta-products/types';
import useGetFamilies from 'apps/admin-dashboard/src/Midl/meta-products/hooks/family/get-families';

import ApplicationButton, { ButtonWithoutStyles } from '../../global/buttons';
import InfoText from '../../global/info-text';
import ApplicationModal from '../../global/modal';
import ApplicationTextInput from '../../global/text-input';
import styles from './styles/meta.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'apps/admin-dashboard/src/store';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ApplicationSpinner from '../../global/spinner';
import { orderBy } from 'firebase/firestore';
import {
  setDndFamily,
  setRestoreBeforeDnd,
} from 'apps/admin-dashboard/src/Midl/meta-products/store/meta-product.family.slice';
import { PRODUCT_FAMILY_DND_ID } from 'apps/admin-dashboard/src/utils/settings';
import produce from 'immer';
import { batchCommitFamily } from 'apps/admin-dashboard/src/Midl/meta-products/hooks/family/helpers-family';
import { TApplicationErrorObject, useSubject } from 'rxf-rewrite/dist';

const showAddForm$ = new BehaviorSubject(false);

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(12),
});

const ProductFamily: React.FC = () => {
  useSubject(showAddForm$);
  const { addFamily, loadingFlag, completed, completeSetter } = useAddFamily(
    showAddForm$.value
  );
  const { getFamilies } = useGetFamilies(true);
  const families = useSelector((state: RootState) => state.metaProductFamily);
  const dndInit =
    families.dndInit === 'initialize' || families.dndInit === 'continue';
  const dbError = useSelector(
    (state: RootState) => state.metaProductFamily.addError
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    families.metaProductFamilies.length === 0 &&
      getFamilies([orderBy('index')]);
  }, []);

  return (
    <div className={styles['root-content']}>
      <div className={styles['heading']}>
        <div></div>
        <h2>Product Family</h2>
        <ApplicationButton
          clickAction={() => {
            showAddForm$.next(true);
            completeSetter(false);
          }}
          variant="default"
        >
          <AddIcon /> <span>Add Family</span>
        </ApplicationButton>
      </div>
      {dndInit && (
        <div className={styles['dnd-container']}>
          <div className={styles['inner']}>
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
                  produce(families, (draft) =>
                    batchCommitFamily(draft.metaProductFamilies, 'Somnath')
                  );
                  dispatch(setDndFamily('default'));
                }}
                dimension={{ height: '100%', width: '100%' }}
              >
                Save
              </ApplicationButton>
            </div>
          </div>
        </div>
      )}
      <Droppable droppableId={PRODUCT_FAMILY_DND_ID}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles['list']}
          >
            {families.metaProductFamilies.map((f) => (
              <Draggable
                key={f.id}
                draggableId={`draggable ${f.id}`}
                index={f.index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles['list-content']}
                  >
                    <List family={f} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <ApplicationModal mounted={showAddForm$.value}>
        <Form
          dbError={dbError}
          onCompleteText={'Product Family Has been Successfully Created!'}
          unmountFunc={() => showAddForm$.next(false)}
          submitFormFunc={(name: string) => {
            addFamily({ name: name, createdBy: 'Somnath' }, uuidv4());
          }}
          loadingFlag={loadingFlag}
          completed={completed}
        />
      </ApplicationModal>
    </div>
  );
};

const List: React.FC<{
  family: TMetaProductFamily;
}> = ({ family }) => {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const dbError = useSelector(
    (state: RootState) => state.metaProductFamily.editError
  );
  const { updateFamilyName, loadingFlag, completed, completedSetter } =
    useUpdateFamily(showEditForm);

  return (
    <>
      <div className={styles['main']}>
        <h3>{family.name}</h3>
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
          <ApplicationButton clickAction={() => {}} variant="disable">
            Unpublish
          </ApplicationButton>
        </div>
      </div>
      <div className={styles['footer']}></div>
      <ApplicationModal mounted={showEditForm}>
        <Form
          dbError={dbError}
          onCompleteText={'Changes Have Been Saved Successfully!'}
          unmountFunc={() => setShowEditForm(false)}
          submitFormFunc={(name: string) =>
            updateFamilyName({ name: name, updatedBy: 'Somnath' }, family.id)
          }
          completed={completed}
          productFamilyNameDefaultValue={family.name}
          loadingFlag={loadingFlag}
        />
      </ApplicationModal>
    </>
  );
};

const Form: React.FC<{
  unmountFunc: () => void;
  submitFormFunc: (name: string) => void;
  loadingFlag: boolean;
  completed: boolean;
  dbError: TApplicationErrorObject | null;
  onCompleteText: string;
  productFamilyNameDefaultValue?: string;
}> = ({
  unmountFunc,
  submitFormFunc,
  loadingFlag,
  completed,
  dbError,
  productFamilyNameDefaultValue,
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
        <h3>Product Family</h3>
        <ButtonWithoutStyles clickAction={() => unmountFunc()}>
          <CloseCircle />
        </ButtonWithoutStyles>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className={styles['product-form-body']}>
          <label>Product Name:</label>
          <div>
            <ApplicationTextInput
              defaultValue={productFamilyNameDefaultValue}
              inputChangeFunc={register}
              fieldName="name"
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

export default ProductFamily;
