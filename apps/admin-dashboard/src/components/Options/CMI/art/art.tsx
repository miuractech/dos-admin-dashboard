import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../../components/top-bar.slice'
import { AddIcon } from '@admin/assets'
import ApplicationButton from '../../../global/buttons'
import { firestore } from '../../../../config/firebase.config'
import { doc, updateDoc } from 'firebase/firestore'
import PopUpArt from './popUpArt'
import { DataGridArt } from './artTable'

export const Art = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(update({ base: 'cmi', path: 'art' }))
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const changed = async (row: any) => {
        try {
            const updateRef = doc(firestore, "Arts", row.id);
            await updateDoc(updateRef, {
                enabled: !row.enabled
            });
        } catch (error) {
            console.log(error);

        }


    }
    return (
        <div className='main'>
            <PopUpArt
                open={open}
                handleClose={handleClose}
            />
            <div style={{ marginBottom: "25px", float: "right" }}>
                <ApplicationButton
                    variant="default"
                    clickAction={handleOpen}
                >
                    <AddIcon /> <span>Add Art</span>
                </ApplicationButton>
            </div>
            <DataGridArt changed={changed} />
        </div >
    )
}
