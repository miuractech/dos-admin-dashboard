import styles from './cmi.module.css';
import CustomMerchInterface from './features/custom_merch_interface(CMI)';

/* eslint-disable-next-line */
export interface CmiProps { }

export function CMI(props: CmiProps) {
  return (
    <div className={styles['container']}>
      <CustomMerchInterface />
    </div>
  );
}
