import { AddIcon } from '@admin/assets'
import { Alert, Box, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ApplicationTextInput from '../../../global/text-input'
import { update } from '../../components/top-bar.slice'
import { DataGrid } from './dataTable'
import { Clear, DriveFolderUpload } from '@mui/icons-material';
import "./style.css"
import { useDropzone } from 'react-dropzone'
import ApplicationButton from '../../../global/buttons'
import useStorage from './storage'
import { firestore } from '../../../../config/firebase.config'
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'

export const Fonts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(update({ base: 'cmi', path: 'font' }))
    }, [dispatch])

    const { upload } = useStorage()

    const [error, setError] = useState('')
    const [prog, setProg] = useState("")
    const [fileSelected, setfileSelected] = useState(false)
    const [progress, setprogress] = useState(false)
    const [alert, setAlert] = useState(false)
    const FolderName = "fonts"
    const [fontName, setfontName] = useState("")

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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



    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const onsuccess = async (url: string, uniID: string) => {
        try {
            await setDoc(doc(firestore, "Fonts", uniID), {
                fontName: fontName,
                createdAt: serverTimestamp(),
                url: url,
                enabled: true
            });
            setFontFile(null)
            setfileSelected(false)
            setAlert(true)
            setOpen(false)
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
        upload({
            file: fontFile, path: FolderName, onsuccess, onFail: (err: any) => console.log(err), onProgress: (prog: string) => setProg(prog),
        })
    }

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setfontName(name)
    }

    const changed = async (row: any) => {
        try {
            const updateRef = doc(firestore, "Fonts", row.id);
            await updateDoc(updateRef, {
                enabled: !row.enabled
            });
        } catch (error) {
            console.log(error);

        }


    }

    return (
        <div className='main'>
            <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                {alert && <Alert onClose={() => { setAlert(false) }}>This is a success alert — check it out!</Alert>}
                {error && <Alert onClose={() => { setError("") }} severity="error">{error}</Alert>}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
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
                                <ApplicationTextInput onChange={change} />
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
                                    <p style={{ color: 'green' }}>{acceptedFileItems}</p>
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
            <div style={{ marginBottom: "25px", float: "right" }}>
                <ApplicationButton
                    variant="default"
                    clickAction={handleOpen}
                >
                    <AddIcon /> <span>Add Fonts</span>
                </ApplicationButton>
            </div>
            <DataGrid changed={changed} />
        </div >
    )
}
