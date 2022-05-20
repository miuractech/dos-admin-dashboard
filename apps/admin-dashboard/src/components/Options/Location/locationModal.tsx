import { Box, Modal, Typography } from '@mui/material'
import DOSInput from '../../../UI/dosinput/dosinput';
import React from 'react'
import ApplicationTextInput from '../../global/text-input';

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

type LocationModalPorps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LocationModal = ({ open, setOpen }: LocationModalPorps) => {

    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <DOSInput />
                <Typography variant='h4' style={{ textAlign: "center", margin: "20px 0 50px" }}>Location</Typography>
                <div className='lableInput'>
                    <Typography style={{ width: "100px" }}>Font Name</Typography>
                    <ApplicationTextInput />
                </div>
                <div className='lableInput'>
                    <Typography style={{ width: "100px" }}>Pincode</Typography>
                    <ApplicationTextInput />
                </div>
                <div style={{ display: "flex", columnGap: "40px", width: "81%", margin: "auto" }}>
                    <div className='lableInput'>
                        <Typography style={{ width: "200px" }}>Latitude</Typography>
                        <ApplicationTextInput style={{ width: "50%" }} />
                    </div>
                    <div className='lableInput'>
                        <Typography style={{ width: "100px" }}>Longitude</Typography>
                        <ApplicationTextInput style={{ width: "50%" }} />
                    </div>
                </div>
            </Box>
        </Modal >
    )
}
