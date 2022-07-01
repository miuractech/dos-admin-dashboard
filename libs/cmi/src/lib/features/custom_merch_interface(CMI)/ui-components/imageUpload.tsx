import { Button, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import SimpleModal from './modal'
import Accept from '../components/uploadComponent'
import { Clear } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addObject } from '../store/objects'
import { v4 as uuidv4 } from 'uuid';
import { MiuracImage } from '@miurac/image-upload'
import { app } from '../../../config/firebase'
type Props = {
    open: boolean
    onClose : (event?: Record<string, unknown>, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
}

export default function ImageUpload({open,onClose,setLoading}: Props) {
    const [image, setImage] = useState< string | null>(null)
    const [agree, setAgree] = useState(false)
    const dispatch = useDispatch()
    return (
        <SimpleModal
        open={open} 
        onClose={onClose}    
        >
            <Grid container spacing={1} >
            <Grid item xs={12}>
                    <br />
                    <br />
                    <Typography>
                        <Checkbox disabled={agree} onChange={(e)=>setAgree(e.target.checked)} />
                        By clicking "Upload", you agree to the terms and conditions
                    </Typography>
                    <br />
                   
                </Grid>
                <Grid item xs={12} >
                    <br />
                    
                    {!agree?<Button
                    variant='contained'
                    // style={{}}
                    disabled={agree}
                    >
                        Upload
                    </Button>
                    :
                    <MiuracImage 
                            setUrlFunc={(url) =>{
                                    setLoading(true)
                                    const img = new Image();
                                    img.onload = function(){
                                        const { height, width } = img;
                                        const aspect = width/height
                                        const x = aspect>1?300:(300*aspect)
                                        const y = (aspect<=1)?(300):(300/aspect)
                                        dispatch(addObject({
                                            type:'img',
                                            image:url,
                                            width:x,
                                            height:y,
                                            x:100,
                                            y:100,
                                            id:uuidv4(),
                                            keepRatio:true
                                        }))
                                        setImage(null)
                                        setTimeout(() => {
                                            setLoading(false)
                                          }, 150);;
                                          onClose()
                                        // code here to use the dimensions
                                      }
                                      img.src = url
                                }} 
                            app={app} 
                            updateFirestore={false} 
                            editConfig={null}
                            buttonComponent={
                                <Button
                                variant='contained'
                                // style={{}}
                                // disabled={agree}
                                >
                                    Upload
                                </Button>
                            }
                            />}
                </Grid>
               
            </Grid>
        </SimpleModal>
    )
}