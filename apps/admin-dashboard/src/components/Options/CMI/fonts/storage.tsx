import { storage } from "../../../../config/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useStorage = () => {
    const upload = ({ file, path, onsuccess, name, onFail, onProgress }: any) => {
        const storageRef = ref(storage, `/${path}/${name}`);
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
                onsuccess(url)
            }
        );

    };
    return { upload };
};

export default useStorage;
