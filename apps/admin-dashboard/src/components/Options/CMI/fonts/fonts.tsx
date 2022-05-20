import { AddIcon } from '@admin/assets'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../../components/top-bar.slice'
import { DataGrid } from './fontsTable'
import ApplicationButton from '../../../global/buttons'
import { firestore } from '../../../../config/firebase.config'
import PopUpAction from './popUpFonts'
import { doc, updateDoc } from 'firebase/firestore'
import "../../style.css"

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
