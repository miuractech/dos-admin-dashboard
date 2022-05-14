import { Button, CircularProgress, FormControlLabel, Input, Switch, SwitchProps, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from "react-data-table-component"
import { styled } from '@mui/material/styles';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase.config'
import PopUpArt from './popUpArt';
import { FilterComponent } from '../../components/filterComponent';

type DataGripPorps = {
    changed: (row: any) => void
}

export const DataGridArt = ({ changed }: DataGripPorps) => {

    const [popUpInfo, setpopUpInfo] = useState<any>(null)
    const [arts, setArts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filterText, setFilterText] = useState('');

    const artsCollectionRef = collection(firestore, "Arts")
    useEffect(() => {

        const unsub = onSnapshot(artsCollectionRef, (snapshot: any) => {

            const arr: any[] = []
            snapshot.docs.forEach((doc: any) => {
                arr.push({ ...doc.data(), id: doc.id })
            })
            // console.log(arr);

            setArts(arr)
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
            name: "Art Name",
            selector: (a: any) => a.artName,
            sortable: true
        },
        {
            name: "Preview",
            cell: (row: any) => <img style={{ display: "block", margin: "8px auto", maxWidth: 250, maxHeight: 100 }} src={row.url} alt={row.artName} />
        },

        {
            name: <div style={{ fontSize: 25 }}>Action</div>,
            cell: (row: any) =>
                <div style={{ width: "200px", display: "flex", justifyContent: "space-evenly" }}>
                    <Button variant='outlined' onClick={async () => {
                        try {
                            const response = await fetch(row.url, {
                                method: 'GET',
                            })
                            const blob = await response.blob()

                            setpopUpInfo({
                                ...row, file: new File([blob], `${row.name}.svg`, { lastModified: new Date().getTime() })
                            })
                        } catch (error) {
                            console.log(error);

                        }

                    }}>Edit</Button>
                    {/* <Button color="error" variant='outlined'>Delete</Button> */}


                </div>,
            width: "200px",

        },
    ]


    console.log('test')
    const filteredItems = arts.filter(
        (item: any) => item.artName && item.artName.toLowerCase().includes(filterText.toLowerCase()),
    );




    console.log("hey");
    // console.log(filteredItems);

    return (!loading ?
        <>
            <DataTable
                columns={coloum}
                data={filteredItems}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='50vh'
                highlightOnHover
                customStyles={customStyles}
                subHeader
                subHeaderComponent={<SubHeaderComponent filterText={filterText} setFilterText={setFilterText} />}
            />
            <PopUpArt
                open={Boolean(popUpInfo)}
                handleClose={() => setpopUpInfo(null)}
                artNameInput={popUpInfo?.artName}
                artFileInput={popUpInfo?.file}
                id={popUpInfo?.id}
                url={popUpInfo?.url}
            />
        </>
        : <div style={{ height: "100px", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress />
        </div>)
}

const SubHeaderComponent = ({ filterText, setFilterText, }: { filterText: string, setFilterText: any }) => {
    const handleClear = () => {
        if (filterText) {
            setFilterText('');
        }
    };
    console.log(setFilterText)
    return (
        <FilterComponent handleClear={handleClear} setFilterText={setFilterText} filterText={filterText} />
    );

}