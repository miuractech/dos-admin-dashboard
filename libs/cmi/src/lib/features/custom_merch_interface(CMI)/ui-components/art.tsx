import { Button, Checkbox, Grid, IconButton, Typography } from '@mui/material'
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
                <Grid container spacing={3} >
                    {arts.map((art: any) => (
                        <Grid key={art.id} item xs={12} md={4} sm={6}  >
                            <div className="flex vertical-center justify-center"
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
                                <img src={art.url} className='full-width' alt="" />
                            </div>
                            <div>
                                {art.artName}
                            </div>
                        </Grid>
                    ))}
                </Grid>
            }
        </SimpleModal>
    )
}