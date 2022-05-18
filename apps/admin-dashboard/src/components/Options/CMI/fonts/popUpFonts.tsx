import { Alert, Box, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ApplicationButton from '../../../global/buttons'
import ApplicationTextInput from '../../../global/text-input';
import { firestore } from '../../../../config/firebase.config'
import { doc, increment, serverTimestamp, writeBatch } from 'firebase/firestore'
import { useDropzone } from 'react-dropzone';
import { Clear, DriveFolderUpload } from '@mui/icons-material';
import useStorage from './storage';
import { v4 as uuidv4 } from 'uuid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    p: 4,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "25px"
};

type Props = {
    open: boolean,
    handleClose: any,
    fontNameInput?: null | string,
    fontFileInput?: null | File,
    id?: string,
}

export default function PopUpAction({ open, handleClose, fontNameInput, fontFileInput, id }: Props) {
    const { upload } = useStorage()

    const [error, setError] = useState('')
    const [prog, setProg] = useState("")
    const [fileSelected, setfileSelected] = useState(false)
    const [progress, setprogress] = useState(false)
    const [alert, setAlert] = useState(false)
    const FolderName = "fonts"
    const [fontName, setfontName] = useState("")
    const [previweFont, setpreviweFont] = useState("")
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'file/ttf': ['.ttf']
        }

    });
    const [fontFile, setFontFile] = useState<File | null>(null)

    useEffect(() => {
        if (acceptedFiles.length === 1) {
            setFontFile(acceptedFiles[0])
            setfileSelected(true)
        }

    }, [acceptedFiles])
    useEffect(() => {
        if (fontNameInput) {
            setfontName(fontNameInput)
        }
        if (fontFileInput) {
            setFontFile(fontFileInput)
            setfileSelected(true)
        }




    }, [fontNameInput, fontFileInput])



    const AcceptedFileItems = () => (
        <li key={fontFile?.name}>
            {fontFile?.name} - {fontFile?.size} bytes
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
        const onsuccessBatch = writeBatch(firestore);
        try {
            onsuccessBatch.set(doc(firestore, "Fonts", name), {
                fontName: fontName,
                createdAt: serverTimestamp(),
                url: url,
                enabled: true
            });
            const fontscountRef = doc(firestore, "meta", "count");
            onsuccessBatch.update(fontscountRef, {
                Fonts: increment(1)
            });
            await onsuccessBatch.commit()
            setFontFile(null)
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
        if (!fontFile) return
        setprogress(true)
        const name = id ? id : `${uuidv4()}.ttf`
        upload({
            file: fontFile, name, path: FolderName, onsuccess: (url: string) => onsuccess(url, name), onFail: (err: any) => console.log(err), onProgress: (prog: string) => setProg(prog),
        })
    }

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setfontName(name)
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
                    setFontFile(null)
                    setfontName('')
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
                    <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Add Font</h3>

                    {progress ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress variant="determinate" value={Number(prog)} /></div>
                        :
                        <>
                            <div style={{ display: "flex", columnGap: "20px", justifyContent: "center", marginBottom: "8%" }}>
                                <Typography>Font Name</Typography>
                                <ApplicationTextInput value={fontName} onChange={change} />
                            </div>

                            <div style={{ display: "flex", columnGap: "20px", justifyContent: "center", marginBottom: "25px" }}>
                                <Typography>TTF File</Typography>
                                {fileSelected ? null :
                                    <section className="container">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <DriveFolderUpload />
                                            <p style={{ color: "#C5C5C5" }}>or drop files to upload</p>
                                        </div>
                                    </section>}
                            </div>
                            {fontFile &&
                                <div style={{ display: "flex", justifyContent: "center", columnGap: "25px", alignItems: "center" }}>
                                    <p style={{ color: 'green' }}><AcceptedFileItems /></p>
                                    <IconButton
                                        size="small"
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                        }}
                                        onClick={() => {
                                            setFontFile(null)
                                            setfileSelected(false)
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