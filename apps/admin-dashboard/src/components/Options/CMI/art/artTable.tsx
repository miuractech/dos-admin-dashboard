import { Button, CircularProgress, FormControlLabel } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import DataTable from "react-data-table-component"
import { collection, doc, DocumentData, getDoc, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, startAfter } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase.config'
import PopUpArt from './popUpArt';
import { SubHeaderComponent } from '../../components/filterComponent';
import { IOSSwitch } from '../../../global/button_IOS/IOS';

type DataGripPorps = {
    changed: (row: any) => void
}

export const DataGridArt = ({ changed }: DataGripPorps) => {

    const [popUpInfo, setpopUpInfo] = useState<any>(null)
    const [allArts, setAllArts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState("");
    const [lastVisibleRecords, setlastVisibleRecords] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [numberOfRows, setNumberOfRows] = useState(0)
    const [fetchNext, setFetchNext] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const artsCollectionRef = collection(firestore, "Arts")
    const countRef = doc(firestore, "meta", "count")


    const count = async () => {
        try {
            const countSnap = await getDoc(countRef)
            if (countSnap.exists()) {
                setNumberOfRows(countSnap.data()['CMIarts'])
            }
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        const first = query(artsCollectionRef, orderBy("createdAt"), limit(10));
        const unsub = onSnapshot(first, (snapshot: any) => {
            const Doc = snapshot.docs.map((arts: any) => ({ ...arts.data(), id: arts.id }))
            setAllArts(Doc)
            setLoading(false)
            const lastVisible = snapshot.docs[snapshot.docs.length - 1]
            setlastVisibleRecords([lastVisible])
            count()
        })

        return () => unsub()

    }, [])

    const useDidMountEffect = (func: any, deps: any) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    useDidMountEffect(() => {

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let unsub = () => { }
        setFetchNext(true)
        if (currentPage === 1) {

            const first = query(artsCollectionRef, orderBy("createdAt"), limit(10));
            unsub = onSnapshot(first, (snapshot: QuerySnapshot<DocumentData>) => {
                const iscollectionEmpty = snapshot.size === 0
                if (!iscollectionEmpty) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1]
                    const Doc = snapshot.docs.map((arts: any) => ({ ...arts.data(), id: arts.id }))
                    setAllArts(Doc)
                    setFetchNext(false)
                    if (currentPage > lastVisibleRecords.length) {
                        setlastVisibleRecords([...lastVisibleRecords, lastVisible])
                    }
                } else {
                    console.log("collection is empty");

                }

            })
        } else {
            const next = query(artsCollectionRef,
                orderBy("createdAt"),
                startAfter(lastVisibleRecords[currentPage - 2]),
                limit(10));
            unsub = onSnapshot(next, (snapshot: QuerySnapshot<DocumentData>) => {
                const iscollectionEmpty = snapshot.size === 0
                if (!iscollectionEmpty) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1]
                    const Doc = snapshot.docs.map((arts) => ({ ...arts.data(), id: arts.id }))
                    setAllArts(Doc)
                    setFetchNext(false)
                    count()
                    if (currentPage > lastVisibleRecords.length) {
                        setlastVisibleRecords([...lastVisibleRecords, lastVisible])
                    }
                } else {
                    console.log("collection is empty");

                }


            })
        }


        return () => {
            unsub()
        }

    }, [currentPage]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


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
            name: <div style={{ fontSize: 15, fontWeight: "block" }}>Art Name</div>,
            selector: (a: any) => a.artName,
            sortable: true
        },
        {
            name: <div style={{ fontSize: 15 }}>Preview</div>,
            cell: (row: any) => <img style={{ display: "block", margin: "8px auto", maxWidth: 250, maxHeight: 100 }} src={row.url} alt={row.artName} />
        },

        {
            name: <div style={{ fontSize: 15 }}>Action</div>,
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

    // const filteredItems = allArts.filter(
    //     (item: any) => item.artName && item.artName.toLowerCase().includes(filterText.toLowerCase()),
    // );

    return (!loading ?
        <><SubHeaderComponent filterText={filterText} setFilterText={setFilterText} />
            <DataTable
                columns={coloum}
                data={allArts}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='50vh'
                highlightOnHover
                customStyles={customStyles}
                subHeader
                progressPending={fetchNext}
                paginationServer
                paginationComponentOptions={{ noRowsPerPage: true }}
                onChangePage={handlePageChange}
                paginationTotalRows={numberOfRows}
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

