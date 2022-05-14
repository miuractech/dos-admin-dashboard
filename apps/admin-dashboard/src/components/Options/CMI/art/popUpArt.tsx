import { Alert, Box, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ApplicationButton from '../../../global/buttons'
import ApplicationTextInput from '../../../global/text-input';
import { firestore } from '../../../../config/firebase.config'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useDropzone } from 'react-dropzone';
import { Clear, DriveFolderUpload } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import useStorage from '../fonts/storage';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

type Props = {
    open: boolean,
    handleClose: any,
    artNameInput?: null | string,
    artFileInput?: null | File,
    id?: string,
    url?: string
}

export default function PopUpArt({ open, handleClose, artNameInput, id, url }: Props) {
    const { upload } = useStorage()

    const [error, setError] = useState('')
    const [prog, setProg] = useState("")
    const [fileSelected, setfileSelected] = useState(false)
    const [progress, setprogress] = useState(false)
    const [alert, setAlert] = useState(false)
    const FolderName = "arts"
    const [artName, setArtName] = useState("")
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'file/svg': ['.svg']
        }

    });
    const [artFile, setArtFile] = useState<File | null>(null)
    const [psudoFile, setPsudoFile] = useState("")

    useEffect(() => {
        if (acceptedFiles.length === 1) {
            setArtFile(acceptedFiles[0])
            setfileSelected(true)
        }

    }, [acceptedFiles])

    useEffect(() => {
        if (artNameInput) {
            setArtName(artNameInput)
            setPsudoFile(artNameInput)
        }
    }, [artNameInput])



    const AcceptedFileItems = () => (
        <li key={artFile?.name}>
            {artFile?.name} - {artFile?.size} bytes
        </li>
    );

    const fileRejectionItems = fileRejections.map(({ file, errors }: any) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
            <ul>
                {errors.map((e: any) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const onsuccess = async (url: string, name: string) => {
        try {
            await setDoc(doc(firestore, "Arts", name), {
                artName: artName,
                createdAt: serverTimestamp(),
                url: url,
                enabled: true
            });
            setArtFile(null)
            setfileSelected(false)
            setAlert(true)
            handleClose()
            setprogress(false)
            setTimeout(() => {
                setAlert(false)
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const save = () => {
        if (artNameInput && psudoFile && url && id) {
            onsuccess(url, id)
        }
        if (!artFile) return
        setprogress(true)
        const name = id ? id : `${uuidv4()}.svg`
        upload({
            file: artFile, name, path: FolderName, onsuccess: (url: string) => onsuccess(url, name), onFail: (err: any) => console.log(err), onProgress: (prog: string) => setProg(prog),
        })
    }

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setArtName(name)
    }


    return (
        <>
            <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                {alert && <Alert onClose={() => { setAlert(false) }}>This is a success alert — check it out!</Alert>}
                {error && <Alert onClose={() => { setError("") }} severity="error">{error}</Alert>}
            </div>
            <Modal
                open={open}
                onClose={() => {
                    setArtFile(null)
                    setArtName('')
                    setProg('')
                    setAlert(false)
                    setError('')
                    setprogress(false)
                    setfileSelected(false)
                    handleClose()

                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Add Art</h3>

                    {progress ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress variant="determinate" value={Number(prog)} /></div>
                        :
                        <>
                            <div style={{ display: "flex", columnGap: "20px", justifyContent: "center", marginBottom: "8%" }}>
                                <Typography>Art Name</Typography>
                                <ApplicationTextInput value={artName} onChange={change} />
                            </div>

                            <div style={{ display: "flex", columnGap: "20px", justifyContent: "center", marginBottom: "25px" }}>
                                <Typography>SVG File</Typography>
                                {fileSelected || psudoFile ? null :
                                    <section className="container">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <DriveFolderUpload />
                                            <p style={{ color: "#C5C5C5" }}>or drop files to upload</p>
                                        </div>
                                    </section>}
                            </div>
                            {artFile &&
                                <div style={{ display: "flex", justifyContent: "center", columnGap: "25px", alignItems: "center" }}>
                                    <p style={{ color: 'green' }}><AcceptedFileItems /></p>
                                    <IconButton
                                        size="small"
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                        }}
                                        onClick={() => {
                                            setArtFile(null)
                                            setfileSelected(false)
                                        }}
                                    >
                                        <Clear sx={{ fontSize: 10 }} />
                                    </IconButton>
                                </div>}
                            {psudoFile &&
                                <div style={{ display: "flex", justifyContent: "center", columnGap: "25px", alignItems: "center" }}>
                                    <p style={{ color: 'green' }}>{psudoFile}</p>
                                    <IconButton
                                        size="small"
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                        }}
                                        onClick={() => {
                                            setArtFile(null)
                                            setfileSelected(false)
                                            setPsudoFile("")
                                        }}
                                    >
                                        <Clear sx={{ fontSize: 10 }} />
                                    </IconButton>
                                </div>}
                            <p style={{ color: 'red' }}>{fileRejectionItems}</p>

                            <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-evenly", paddingLeft: "60px" }}>
                                <div style={{ height: 40, width: 100 }}>
                                    <ApplicationButton
                                        variant="cancel"
                                        clickAction={handleClose}
                                        dimension={{ height: '100%', width: '100%' }}
                                    >
                                        Cancel
                                    </ApplicationButton>
                                </div>
                                <div>
                                    <ApplicationButton
                                        variant="default"
                                        clickAction={save}
                                    >
                                        Save
                                    </ApplicationButton>
                                </div>
                            </div>
                        </>
                    }
                </Box>
            </Modal>
        </>
    )
}