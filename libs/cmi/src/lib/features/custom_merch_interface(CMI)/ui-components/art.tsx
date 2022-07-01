import { Button, Card, CardMedia, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SimpleModal from './modal'
import Accept from '../components/uploadComponent'
import { Clear } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addObject } from '../store/objects'
// import { v4 as uuidv4 } from 'uuid';
import { useLeftState } from '../states/states'
import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from '../../../config/firebase'

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
                                        dispatch(addObject({
                                            type: 'img',
                                            image: art.url,
                                            width: 100,
                                            height: 100,
                                            x: 125,
                                            y: 125,
                                            id: art.id,
                                        }))
                                        setTimeout(() => {
                                            setLoading(false)
                                        }, 100);
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