import { storage } from "../../../../config/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
const useStorage = () => {
    const uniID = uuidv4();
    const upload = ({ file, path, onsuccess, name, onFail, onProgress }: any) => {
        const storageRef = ref(storage, `/${path}/${name ? name : uniID}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                onProgress(prog);
            },
            (err) => onFail(err),
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                onsuccess(url, uniID)
            }
        );

    };
    return { upload };
};

export default useStorage;

function onsuccess(url: string) {
    throw new Error("Function not implemented.");
}
