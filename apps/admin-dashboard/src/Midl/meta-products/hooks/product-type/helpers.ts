import { firestore, storage } from '../../../../config/firebase.config';
import {
  FirebaseRepository,
  FirebaseFileStorage,
  ApplicationError,
  ApplicationErrorHandler,
} from 'rxf-rewrite/dist';
import { TMetaProductType } from '../../types';
import { undefinedArrayCheck } from 'apps/admin-dashboard/src/utils/helpers/validation-custom';
import { getDownloadURL, UploadResult } from 'firebase/storage';

export const productTypeRepo = new FirebaseRepository<TMetaProductType>(
  '/meta/products/product_type',
  firestore
);

export const productTypeStorage = new FirebaseFileStorage(
  storage,
  '/product-type'
);

function checkIfEncounteredErrorUploadingFiles(
  arr: Array<UploadResult | ApplicationErrorHandler>
) {
  return arr.filter((a) => a instanceof ApplicationErrorHandler).length === 0
    ? (arr as Array<UploadResult>)
    : ([] as Array<UploadResult>);
}

export async function uploadArrayOfFiles(files: Array<FileList | undefined>) {
  const res = undefinedArrayCheck(files);
  if (res.length === 0)
    return new ApplicationError().handleCustomError(
      'file/upload',
      'file upload',
      'error uploading file',
      'error'
    );
  else {
    const mapped = await Promise.all(
      res.map(async (r) => {
        return await productTypeStorage.uploadFile(r[0]);
      })
    );
    const secondCheck = checkIfEncounteredErrorUploadingFiles(mapped);
    if (secondCheck.length === 0)
      return new ApplicationError().handleCustomError(
        'file/upload',
        'file upload',
        'error uploading file',
        'error'
      );
    else
      return Promise.all(
        secondCheck.map(async (s) => await getDownloadURL(s.ref))
      );
  }
}
