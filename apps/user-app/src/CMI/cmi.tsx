import { Backdrop, CircularProgress } from '@mui/material';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import styles from './cmi.module.css';
import CustomMerchInterface from './features/custom_merch_interface(CMI)';

/* eslint-disable-next-line */
export interface CmiProps { }

export function CMI(props: CmiProps) {
  const { isExporting } = useSelector((state: RootState) => state.objects)
  return (
    <div className={styles['container']}>
      <CustomMerchInterface />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isExporting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
