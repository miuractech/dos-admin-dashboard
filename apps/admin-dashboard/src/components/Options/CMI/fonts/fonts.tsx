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
import PopUpAction from './popUpAction'
import { doc, updateDoc } from 'firebase/firestore'

export const Fonts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(update({ base: 'cmi', path: 'font' }))
    }, [dispatch])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            <PopUpAction
            open={open} 
            handleClose={handleClose} 
            />
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
