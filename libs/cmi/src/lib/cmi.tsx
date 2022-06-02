import styles from './cmi.module.css';
import CustomMerchInterface from './features/custom_merch_interface(CMI)';

/* eslint-disable-next-line */
export interface CmiProps { }

export function Cmi(props: CmiProps) {
  return (
    <div className={styles['container']}>
      <CustomMerchInterface />
    </div>
  );
}

export default Cmi;
