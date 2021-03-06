import { AddIcon } from '@admin/assets';
import { ApplicationButton } from '@dos/global'
import { Typography } from '@mui/material';
import React from 'react'
import { LocationModal } from './locationModal';
import { LocationTable } from './locationTable';

export const Location = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);


    return (
        <div className='main'>
            <LocationModal open={open} setOpen={setOpen} />
            <div style={{ display: "flex", textAlign: "center", paddingLeft: "50px" }}>
                <div style={{ flexGrow: "20" }}>
                    <Typography variant='h5'>Location</Typography>
                </div>
                <div style={{ flexGrow: "1", height: "50px", width: "180px" }}>
                    <ApplicationButton
                        variant="default"
                        clickAction={handleOpen}
                        dimension={{ height: '100%', width: '100%' }}
                    >
                        <AddIcon /> <span>Add Location</span>
                    </ApplicationButton>
                </div>
            </div>
            <LocationTable setOpen={setOpen} />
        </div >
    )
}
