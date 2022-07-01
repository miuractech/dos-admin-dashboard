import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode';
import SimpleModal from './modal';
import { Button, Container, Grid, TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { addObject } from '../store/objects';
import { useDispatch } from 'react-redux';

type Props = {
    open: boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
}

export default function Qr({ open, onClose, setLoading }: Props) {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const generateQR = () => {
        // With promises
        QRCode.toDataURL(text, {
            color: {
                dark: "#000000",
                light: "#0000000"
            }
        })
            .then((url: string) => {
                setLoading(true)
                dispatch(addObject({
                    type: 'img',
                    image: url,
                    width: 100,
                    height: 100,
                    x: 125,
                    y: 125,
                    id: uuidv4(),
                }))
                setText('')
                setTimeout(() => {
                    setLoading(false)
                }, 100);;
                onClose()
            })
            .catch((err: any) => {
                console.error(err)
            })

        // // With async/await
        // const generateQR = async (text:any) => {
        // try {
        // console.log(await QRCode.toDataURL(text))
        // } catch (err) {
        // console.error(err)
        // }
    }

    return (
        <SimpleModal
            open={open}
            onClose={() => {
                onClose()
                setText('')
            }}
        >
            <Container>
                <Grid container spacing={1} >
                    <Grid item xs={12} >
                        <div >
                            <TextField name="qrtext" id="" value={text} rows={15} onChange={(e) => setText(e.target.value)} />
                        </div>
                        <br />
                        <Button variant='contained' color='primary' onClick={generateQR} >
                            Insert QR
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </SimpleModal>
    )
}


















