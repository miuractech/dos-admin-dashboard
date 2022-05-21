import { Button, Chip, FormControlLabel, Typography } from '@mui/material';
import { collection, doc, Firestore, onSnapshot, orderBy, query, updateDoc, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import DataTable from "react-data-table-component"
import { IOSSwitch } from '../../global/button_IOS/IOS';
import { firestore } from '../../../config/firebase.config';
import { RootState } from '../../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { id, update } from '../components/locationData';

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};

type LocationTableProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LocationTable = ({ setOpen }: LocationTableProps) => {


    const [locations, setLocations] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const setValue = useSelector((state: RootState) => state.location.value)

    useEffect(() => {
        const locationsRef = collection(firestore, "Locations")
        const first = query(locationsRef, orderBy("createdAt"));
        const unsub = onSnapshot(first, (snapshot: any) => {
            const Doc = snapshot.docs.map((location: any) => ({ ...location.data(), id: location.id }))
            setLocations(Doc)
            setLoading(false)
        })

        return () => unsub()

    }, [])

    const toggle = async (id: string, status: boolean) => {
        try {
            const locationRef = doc(firestore, "Locations", id)
            await updateDoc(locationRef, {
                enabled: !status
            });
        } catch (error) {
            console.log(error);

        }
    }

    const change = async (data: any) => {
        try {
            const currentDefault = locations.filter((location: any) => location.default === true)
            const currentDefaultRef = doc(firestore, "Locations", currentDefault[0].id)
            const locationRef = doc(firestore, "Locations", data.id)
            const batch = writeBatch(firestore)
            batch.update(locationRef, {
                default: true
            });
            batch.update(currentDefaultRef, {
                default: false
            });
            await batch.commit();
        } catch (error) {
            console.log(error);

        }
    }

    const edit = (data: any) => {
        setOpen(true)
        if (setValue) {
            setValue("LocationName", data.LocationName)
            setValue("Pincode", data.Pincode)
            setValue("Latitude", data.Latitude)
            setValue("Longitude", data.Longitude)
            setValue("PickupAdress", data.PickupAdress)
            dispatch(update({ update: "update" }))
            dispatch(id({ id: data.id }))
        }
    }

    const columns = [
        {
            cell: (data: any) =>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} checked={data.enable} onChange={() => toggle(data.id, data.enable)} />}
                    label=""
                />,
            width: "50px",
        },
        {
            cell: (data: any) => <div>{data.LocationName + ' '}{data.default && <Chip size='small' label="Default" color="success" variant="outlined" />}</div>,
            grow: 2
        },
        {
            cell: (data: any) =>
                <div style={{ width: "230px", display: "flex", justifyContent: data.default ? "flex-end" : "space-between" }}>
                    {!data.default && <Button color='info' variant='outlined' onClick={() => change(data)}>Set Default</Button>}
                    <Button color='info' variant='outlined' onClick={() => edit(data)}>Edit</Button>
                    {/* <Button color='error' variant='outlined'>Disable</Button> */}
                </div>,
            grow: 1,


        }
    ]




    return (
        <DataTable
            columns={columns}
            data={locations}
            customStyles={customStyles}
            progressPending={loading}
        />
    )
}
