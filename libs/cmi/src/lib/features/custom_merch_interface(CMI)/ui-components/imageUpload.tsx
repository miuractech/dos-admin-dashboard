import { Button, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SimpleModal } from './modal'
import Accept from '../components/uploadComponent'
import { Clear } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addObject } from '../store/objects'
import { v4 as uuidv4 } from 'uuid';
type Props = {
    open: boolean
    onClose : (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
}

export default function ImageUpload({open,onClose,setLoading}: Props) {
    const [image, setImage] = useState<{preview:string} | null>(null)
    const dispatch = useDispatch()
    return (
        <SimpleModal
        open={open} 
        onClose={onClose}    
        >
            <Grid container spacing={1} >
                <Grid item xs={12} >
                    <br />
                    {image?
                    <div
                    className='relative padding1'
                    style={{width:308,margin:'auto',background:'#ddd'}}
                    >
                        <div
                        className='absolute'
                        style={{top:0,right:5}}
                        
                        >
                            <IconButton 
                            size='small' 
                            style={{
                                backgroundColor: '#eee',
                                color: 'black',
                            }}
                            onClick={()=>setImage(null)}
                            >
                                <Clear />
                            </IconButton>
                        </div>
                        <img style={{maxWidth:300,maxHeight:300}} src={image?.preview} alt="" />
                    </div>
                        :
                    <Accept 
                    // image={image} 
                    setImage={setImage}
                    />}
                    {/* <input type="file" name="" id="" /> */}
                </Grid>
                <Grid item xs={12}>
                    <br />
                    <br />
                    <Typography>
                        <Checkbox disabled={!image} />
                        By clicking "Upload", you agree to the terms and conditions
                    </Typography>
                    <br />
                    <Button
                    variant='contained'
                    style={{}}
                    disabled={!image}
                    onClick={()=>{
                        setLoading(true)
                        dispatch(addObject({
                            type:'img',
                            image:image?.preview,
                            width:100,
                            height:100,
                            x:125,
                            y:125,
                            id:uuidv4(),
                        }))
                        setTimeout(() => {
                            setLoading(false)
                          }, 150);;
                          onClose()
                    }}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </SimpleModal>
    )
}