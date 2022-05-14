import { Button, CircularProgress, FormControlLabel, Switch, SwitchProps } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component"
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase.config'
import PopUpAction from './popUpFonts';

type DataGripPorps = {
    changed: (row: any) => void
}

export const DataGrid = ({ changed }: DataGripPorps) => {


    const [popUpInfo, setpopUpInfo] = useState<any>(null)
    const [font, setFont] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fontsCollectionRef = collection(firestore, "Fonts")
    useEffect(() => {

        const unsub = onSnapshot(fontsCollectionRef, (snapshot: any) => {
            const arr: any[] = []
            snapshot.docs.forEach((doc: any) => {
                arr.push({ ...doc.data(), id: doc.id })
            })
            console.log(arr);

            setFont(arr)
            setLoading(false)

        })

        return () => {
            unsub()
        }

    }, [])

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '3000ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : theme.palette.primary.light,
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    const coloum = [

        {
            name: "",
            cell: (row: any, id: any) =>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} checked={row.enabled} onChange={() => changed(row)} />}
                    label=""
                />,
            width: "50px",

        },
        {
            name: "Font Name",
            selector: (a: any) => a.fontName,
            sortable: true
        },

        {
            name: "Action",
            cell: (row: any) =>
                <div style={{ width: "200px", display: "flex", justifyContent: "space-evenly" }}>
                    <Button variant='outlined' onClick={async () => {
                        try {
                            const response = await fetch(row.url, {
                                method: 'GET',
                            })
                            const blob = await response.blob()

                            setpopUpInfo({ ...row, file: new File([blob], `${row.fontName}.ttf`) })
                        } catch (error) {
                            console.log(error);

                        }

                    }}>Edit</Button>
                    {/* <Button color="error" variant='outlined'>Delete</Button> */}


                </div>,
            width: "200px",

        },
    ]

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };


    return (!loading ?
        <>
            <DataTable

                columns={coloum}
                data={font}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='50vh'
                highlightOnHover
                customStyles={customStyles}


            />
            <PopUpAction
                open={Boolean(popUpInfo)}
                handleClose={() => setpopUpInfo(null)}
                fontNameInput={popUpInfo?.fontName}
                fontFileInput={popUpInfo?.file}
                id={popUpInfo?.id}
            />
        </>
        : <div style={{ height: "100px", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress />
        </div>)
}
