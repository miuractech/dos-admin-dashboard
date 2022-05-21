import { Box, Modal, Typography } from '@mui/material'
import DOSInput from '../../../UI/dosinput/dosinput';
import React, { useEffect, useState } from 'react'
import ApplicationButton from '../../global/buttons';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { update, value } from '../components/locationData';
import { RootState } from '../../../store/index';

const schema = yup.object().shape({
    LocationName: yup.string().required('Name cannot be empty'),
    Pincode: yup.number().positive().integer().required("Pincode cannot be empty"),
    Latitude: yup.number().required("Latitude cannot be empty"),
    Longitude: yup.number().required("Longitude cannot be empty"),
    PickupAdress: yup.string().required("Pickup adress cannot be empty").min(10, "Minimum of 10 characters ")
}).required();


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

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });

    const handleClose = () => {
        setOpen(false)
        setValue("LocationName", "")
        setValue("Pincode", "")
        setValue("Latitude", "")
        setValue("Longitude", "")
        setValue("PickupAdress", "")
        dispatch(update({ update: "modal" }))
    };
    const dispatch = useDispatch()
    const origin = useSelector((state: RootState) => state.location.update)
    const id = useSelector((state: RootState) => state.location.id)

    const save = () => {
        console.log("saved");
    }

    useEffect(() => {
        dispatch(value({ value: setValue }))
    }, [dispatch])


    const onsubmit = async (data: any) => {
        if (origin === "modal") {
            try {
                await addDoc(collection(firestore, "Locations"), {
                    ...data,
                    enabled: false,
                    default: false,
                    createdAt: serverTimestamp()
                });
                handleClose()
            } catch (error) {
                console.log(error);
            }
        } else if (origin === "update") {
            try {
                if (!id) return
                const locationRef = doc(firestore, "Locations", id)
                await updateDoc(locationRef, {
                    ...data
                });
                handleClose()
            } catch (error) {
                console.log((error));

            }
        }
    }

    const getGeo = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    const showPosition = (position: any) => {
        setValue(
            "Latitude", position.coords.latitude
        )
        setValue(
            "Longitude", position.coords.longitude
        )
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="location-popup"
            aria-describedby="choose your location"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <Typography variant='h4' style={{ textAlign: "center", margin: "20px 0 50px" }}>Location</Typography>
                    <div className='lableInput'>
                        <Typography style={{ width: "100px" }}>Name</Typography>
                        <DOSInput style={{ width: "65%" }} forminput={{ ...register("LocationName") }} />
                    </div>
                    {errors['LocationName'] && <p style={{ textAlign: "center", paddingRight: "140px", fontSize: "12px", color: "red" }}>{errors['LocationName'].message}</p>}
                    <div className='lableInput'>
                        <Typography style={{ width: "100px" }} >Pincode</Typography>
                        <DOSInput style={{ width: "65%" }} forminput={{ ...register("Pincode") }} />
                    </div>
                    {errors['Pincode'] && <p style={{ textAlign: "center", paddingRight: "140px", fontSize: "12px", color: "red" }}>{errors['Pincode'].message}</p>}
                    <div style={{ display: "flex", columnGap: "40px", width: "83%", margin: "auto" }}>
                        <div className='lableInput'>
                            <Typography style={{ width: "100px" }} >Latitude</Typography>
                            <DOSInput style={{ width: "65%" }} forminput={{ ...register("Latitude") }} />
                        </div>
                        <div className='lableInput'>
                            <Typography style={{ width: "100px" }}  >Longitude</Typography>
                            <DOSInput style={{ width: "65%" }} forminput={{ ...register("Longitude") }} />
                        </div>
                        <div style={{ paddingTop: "33px" }}><MyLocationIcon onClick={getGeo} /></div>
                    </div>
                    <div className='lableInput'>
                        <Typography style={{ width: "100px" }} >Pickup adress</Typography>
                        <DOSInput style={{ width: "65%" }} InputProps={{ style: { height: "auto" } }} multiline rows={3} forminput={{ ...register("PickupAdress") }} />
                    </div>
                    {errors['PickupAdress'] && <p style={{ textAlign: "center", paddingRight: "140px", fontSize: "12px", color: "red" }}>{errors['PickupAdress'].message}</p>}

                    <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-evenly", paddingLeft: "60px" }}>
                        <div style={{ height: 40, width: 100 }}>
                            <ApplicationButton
                                variant="cancel"
                                clickAction={handleClose}
                                dimension={{ height: '100%', width: '100%' }}
                            >
                                Cancel
                            </ApplicationButton>
                        </div>
                        <div style={{ height: 40, width: 100 }}>
                            <ApplicationButton
                                clickAction={save}
                                variant="default"
                                dimension={{ height: '100%', width: '100%' }}
                            >
                                Save
                            </ApplicationButton>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal >
    )
}
