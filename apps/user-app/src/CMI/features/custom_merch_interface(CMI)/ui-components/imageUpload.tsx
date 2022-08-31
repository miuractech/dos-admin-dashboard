import { Button, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import SimpleModal from './modal'
import Accept from '../components/uploadComponent'
import { Clear } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { addObject } from '../store/objects'
import { v4 as uuidv4 } from 'uuid';
import { MiuracImage } from '@miurac/image-upload'
import { app } from '../../../../configs/firebaseConfig'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '../../../../store/store'
type Props = {
    open: boolean
    onClose : (event?: Record<string, unknown>, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading:boolean,
}

export default function ImageUpload({open,onClose,setLoading}: Props) {
    const [agree, setAgree] = useState(false)
    const dispatch = useDispatch()
    const { selectedSide } = useSelector((state:RootState)=>state.designer)
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
                        <Checkbox checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
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
                                        const centerX = selectedSide.type ==='rect'?(selectedSide.x+selectedSide.width/2):selectedSide.x
                                        const centerY = selectedSide.type ==='rect'?(selectedSide.y+selectedSide.height/2):selectedSide.y
                                        const sideWidth = selectedSide.type ==='rect'?selectedSide.width-20:(selectedSide.radius*1.4)-20
                                        const sideHeight = selectedSide.type ==='rect'?selectedSide.height-20:(selectedSide.radius*1.4)-20

                                        const majorSide = (sideWidth>=sideHeight)?sideHeight:sideWidth
                                        const { height, width } = img;
                                        const aspect = width/height
                                        const x = aspect>1?majorSide:(majorSide*aspect)
                                        const y = (aspect<=1)?(majorSide):(majorSide/aspect)
                                        dispatch(addObject({
                                            type:'img',
                                            image:url,
                                            width:x,
                                            height:y,
                                            x:centerX-(majorSide/2),
                                            y:centerY-(majorSide/2),
                                            id:uuidv4(),
                                            keepRatio:true
                                        }))
                                        setTimeout(() => {
                                            setLoading(false)
                                            setAgree(false)
                                          }, 150);;
                                          onClose()
                                        // code here to use the dimensions
                                      }
                                      img.src = url
                                }
                            } 
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