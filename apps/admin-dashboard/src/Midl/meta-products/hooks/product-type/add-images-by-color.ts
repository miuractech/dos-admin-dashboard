import { firestore } from '../../../../config/firebase.config';
import { runTransaction } from 'firebase/firestore';
import { ApplicationErrorHandler } from 'rxf-rewrite/dist';
import { productTypeRepo, uploadArrayOfFiles } from './helpers';

interface IFormShape {
  colorName: string;
  colorCode: string;
  left: FileList | undefined;
  right: FileList | undefined;
  top: FileList | undefined;
  bottom: FileList | undefined;
  front: FileList | undefined;
  back: FileList | undefined;
}

export default async function addImagesByColor(param: {
  id: string;
  form: IFormShape;
}) {
  const { id, form } = param;
  const res = await runTransaction(firestore, async () => {
    const doc = await productTypeRepo.getOne(id);
    if (doc instanceof ApplicationErrorHandler) return doc;
    else {
      const uploaded = await uploadArrayOfFiles([
        form.left,
        form.right,
        form.top,
        form.bottom,
        form.front,
        form.back,
      ]);
      if (uploaded instanceof ApplicationErrorHandler) return uploaded;
      else {
        const local = doc.sideImages;
        local.push({
          colorName: form.colorName,
          colorCode: form.colorCode,
          sides: {
            left: uploaded[0],
            right: uploaded[1],
            top: uploaded[2],
            bottom: uploaded[3],
            front: uploaded[4],
            back: uploaded[5],
          },
        });
        return await productTypeRepo.updateOne({ sideImages: local }, id);
      }
    }
  });
  return res;
}
