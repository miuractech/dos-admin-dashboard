import { Button, Card, CardMedia, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SimpleModal from './modal'
import Accept from '../components/uploadComponent'
import { Clear } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { addObject } from '../store/objects'
// import { v4 as uuidv4 } from 'uuid';
import { useLeftState } from '../states/states'
import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from '../../../config/firebase'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from 'apps/reseller/src/redux-tool/store'

const artRef = collection(db, "Arts");
type Props = {
    open: boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
}

export default function ArtInsert({ open, onClose, setLoading, loading }: Props) {
    const dispatch = useDispatch()
    const [arts, setArts] = useState<any>([])
    const [error, setError] = useState<{ type: null | string, message: null | string }>({ type: null, message: null })
    const { selectedSide } = useSelector((state:RootState)=>state.designer)
    useEffect(() => {
        const fetchArts = async () => {
            try {

                const q = query(artRef, where("enabled", "==", true), orderBy("createdAt", "desc"), limit(10));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setError({
                        type: 'nodata',
                        message: 'no art found, refine your query search!'
                    })
                } else {
                    setArts(querySnapshot.docs.map(d => ({ ...d.data(), id: d.id })))
                    setError({
                        type: null,
                        message: null
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchArts()

        //   return () => {

        //   }
    }, [])

    return (
        <SimpleModal
            open={open}
            onClose={onClose}
        >
            {error.type ?
                <Typography color={'error'} >
                    {error.message}
                </Typography>
                :
                <>
                    <Typography style={{ padding: "20px" }} variant="h6" align='center' fontWeight={500}>Choose Art</Typography>
                    <Grid container spacing={3} padding="0 20px 20px" >
                        {arts.map((art: any) => (
                            <Grid style={{ borderRadius: 8 }} key={art.id} item xs={12} md={4} sm={6}  >
                                <Card className="pointer-cursor"
                                    style={{ height: "100%", paddingTop: "10px" }}
                                    elevation={3}
                                    onClick={() => {
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
                                                image:art.url,
                                                width:x,
                                                height:y,
                                                x:centerX-(majorSide/2),
                                                y:centerY-(majorSide/2),
                                                id:art.id,
                                                keepRatio:true
                                            }))
                                            setTimeout(() => {
                                                setLoading(false)
                                              }, 50);;
                                              onClose()
                                            // code here to use the dimensions
                                          }
                                          img.src = art.url

                                        setLoading(true)
                                        onClose()
                                    }}

                                >
                                    <div style={{ height: "80%", width: "80%", margin: "auto", display: "flex", justifyContent: "center", alignContent: "center" }}>
                                        {/* <CardMedia
                                            component="img"
                                            // height="100px"
                                            // width="100px"
                                            placeholder='Loading image...'
                                            // width="80%"
                                            loading='lazy'
                                            image={art.url}
                                            alt={art.artName}
                                        /> */}
                                        <img src={art.url} alt={art.artName} style={{ maxWidth: "80%" }} />
                                    </div>
                                    <div>
                                        {art.artName ? (<Typography style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }} align='center' fontWeight={500}>
                                            {art.artName}
                                        </Typography>) : (<Typography align='center' fontWeight={500}>Art</Typography>)}
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </SimpleModal >
    )
}