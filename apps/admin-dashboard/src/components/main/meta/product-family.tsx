import { AddIcon, CloseCircle } from '@admin/assets';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSubject } from 'rxf';
import { BehaviorSubject } from 'rxjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

import ApplicationButton, { ButtonWithoutStyles } from '../../global/buttons';
import InfoText from '../../global/info-text';
import ApplicationModal from '../../global/modal';
import ApplicationTextInput from '../../global/text-input';
import styles from './styles/meta.module.scss';
import useAddFamily from 'apps/admin-dashboard/src/Midl/meta-products/hooks/family/add-family';
import { useSelector } from 'react-redux';
import { RootState } from 'apps/admin-dashboard/src/store';
import { TMetaProductFamily } from 'apps/admin-dashboard/src/Midl/meta-products/types';
import useGetFamilies from 'apps/admin-dashboard/src/Midl/meta-products/hooks/family/get-families';
import { Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';

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
  const families = useSelector(
    (state: RootState) => state.metaProductFamily.metaProductFamilies
  );

  React.useEffect(() => {
    getFamilies();
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
      <Droppable droppableId="product-family-droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles['list']}
          >
            {families.map((f) => (
              <Draggable
                key={f.id}
                draggableId={`draggable ${f.id}`}
                index={f.index}
              >
                {(provided, snapshot) => (
                  <List provided={provided} family={f} />
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      <ApplicationModal mounted={showAddForm$.value}>
        <Form
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

const Form: React.FC<{
  unmountFunc: () => void;
  submitFormFunc: (name: string) => void;
  loadingFlag: boolean;
  completed: boolean;
}> = ({ unmountFunc, submitFormFunc, loadingFlag, completed }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ resolver: yupResolver(validationSchema) });
  const addError = useSelector(
    (state: RootState) => state.metaProductFamily.addError
  );

  function submit(data: { name: string }) {
    submitFormFunc(data.name);
  }

  return (
    <div className={styles['product-family-form']}>
      <div className={styles['product-family-form-heading']}>
        <div></div>
        <h3>Product Family</h3>
        <ButtonWithoutStyles clickAction={() => unmountFunc()}>
          <CloseCircle />
        </ButtonWithoutStyles>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className={styles['product-family-form-body']}>
          <label>Product Name:</label>
          <div>
            <ApplicationTextInput inputChangeFunc={register} fieldName="name" />
            <InfoText
              text={
                errors.name?.message !== undefined ? errors.name.message : ''
              }
              fontFamily="Montserrat"
              variant="error"
            />
            <InfoText
              text={addError !== null ? addError.message : ''}
              fontFamily="Montserrat"
              variant="error"
            />
          </div>
        </div>
        {loadingFlag ? (
          <p>Sending Request</p>
        ) : (
          <div className={styles['form-button-container']}>
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
          </div>
        )}
      </form>
      {completed && (
        <InfoText
          text="Product Family Has been Successfully Created!"
          fontFamily="Montserrat"
          variant="success"
        />
      )}
    </div>
  );
};

const List: React.FC<{
  family: TMetaProductFamily;
  provided: DraggableProvided;
}> = ({ family, provided }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={styles['list-content']}
    >
      <div className={styles['main']}>
        <h3>{family.name}</h3>
        <div className={styles['button-container']}>
          <ApplicationButton clickAction={() => {}} variant="edit">
            Edit
          </ApplicationButton>
          <ApplicationButton clickAction={() => {}} variant="disable">
            Disable
          </ApplicationButton>
        </div>
      </div>
      <div className={styles['footer']}></div>
    </div>
  );
};

export default ProductFamily;
