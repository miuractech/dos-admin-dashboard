import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { InputField } from "../../../UI/input-field/input-field"

export const ContactUs = () => {
    const theme = useTheme()
    const medium = useMediaQuery(theme.breakpoints.up("md"))
    return (
        <div>
            <Typography className='my-8' align='center' variant='h4'>Our Contact</Typography>
            <Typography align='center'>Our Service Team will be happy to answer any questions relating to Dropout store</Typography>
            <div className='flex justify-center gap-10 my-16 flex-wrap'>
                <div className='relative'>
                    <div className='mx-48 p-2 h-8 rounded-full text-white flex justify-center absolute -top-5' style={{ backgroundColor: "#161C33", alignItems: "center" }}><MailOutlineOutlinedIcon /></div>
                    <div className='text-center p-6 text-white rounded-md' style={{ backgroundColor: "#161C33" }}>
                        <Typography variant='h6'>Dropoutstotre@gmail.com</Typography>
                        <Typography>We’ll get back to you within 3-5 business days</Typography>
                    </div>
                </div>
                <div className='relative'>
                    <div className='mx-48 p-2 h-8 rounded-full text-white flex justify-center absolute -top-5' style={{ backgroundColor: "#161C33", alignItems: "center" }}><CallOutlinedIcon /></div>
                    <div className='text-center p-6 text-white rounded-md' style={{ backgroundColor: "#161C33" }}>
                        <Typography variant='h6' className='w-80'>+91 534534535</Typography>
                        <Typography>We’ll get back to you within 3-5 business days</Typography>
                    </div>
                </div>
            </div >
            <div className='shadow-lg py-16 min-w-1/4 w-3/4 m-auto'>
                <Typography className='w-3/4 m-auto' variant='h5' fontWeight={500}>Contact Form</Typography>
                <div className={medium ? 'grid grid-cols-2 gap-5 py-5 w-3/4 m-auto' : 'grid gap-5 py-5 w-3/4 m-auto'}>
                    <div><InputField placeholder='Your Full Name' fullWidth /></div>
                    <div><InputField placeholder='Your Email ' fullWidth /></div>
                    <div><InputField placeholder='Subject' fullWidth /></div>
                    <div><InputField placeholder='Phone Number' fullWidth /></div>
                </div>
                <div className='mb-5 w-3/4 m-auto'><InputField placeholder='Your queries' fullWidth multiline maxRows={4} /></div>
                <div className='text-center w-3/4 m-auto'><Button variant='contained'>Submit Your Queries</Button></div>
            </div>
        </div >
    )
}
