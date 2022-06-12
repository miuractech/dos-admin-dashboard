import { FirebaseApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

type useStorageProps = {
    app: FirebaseApp
}

const useStorage = ({ app }: useStorageProps) => {
    const storage = getStorage(app);
    const upload = ({ file, path, onsuccess, fileName, onFail, setProgress }: any) => {
        const storageRef = ref(storage, `/${path}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
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
