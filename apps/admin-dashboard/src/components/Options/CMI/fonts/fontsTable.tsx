import { Button, CircularProgress, FormControlLabel } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import DataTable from "react-data-table-component"
import { collection, doc, DocumentData, getDoc, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, startAfter, where } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase.config'
import PopUpAction from './popUpFonts';
import { SubHeaderComponent } from '../../components/filterComponent';
import { IOSSwitch } from '../../../global/button_IOS/IOS';

type DataGripPorps = {
    changed: (row: any) => void
}

export const DataGrid = ({ changed }: DataGripPorps) => {


    const [popUpInfo, setpopUpInfo] = useState<any>(null)
    const [font, setFont] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filterText, setFilterText] = useState("");
    const [lastVisibleRecords, setlastVisibleRecords] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [numberOfRows, setNumberOfRows] = useState(0)
    const [fetchNext, setFetchNext] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const fontsCollectionRef = collection(firestore, "Fonts")
    const countRef = doc(firestore, "meta", "count")


    const count = async () => {
        try {
            const countSnap = await getDoc(countRef)
            if (countSnap.exists()) {
                setNumberOfRows(countSnap.data()['Fonts'])
            }
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        const first = query(fontsCollectionRef, orderBy("createdAt"), limit(10));
        const unsub = onSnapshot(first, (snapshot: any) => {
            const Doc = snapshot.docs.map((fonts: any) => ({ ...fonts.data(), id: fonts.id }))
            setFont(Doc)
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

            const first = query(fontsCollectionRef, orderBy("createdAt"), limit(10));
            unsub = onSnapshot(first, (snapshot: QuerySnapshot<DocumentData>) => {
                const iscollectionEmpty = snapshot.size === 0
                if (!iscollectionEmpty) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1]
                    const Doc = snapshot.docs.map((fonts: any) => ({ ...fonts.data(), id: fonts.id }))
                    setFont(Doc)
                    setFetchNext(false)
                    if (currentPage > lastVisibleRecords.length) {
                        setlastVisibleRecords([...lastVisibleRecords, lastVisible])
                    }
                } else {
                    console.log("collection is empty");

                }

            })
        } else {
            const next = query(fontsCollectionRef,
                orderBy("createdAt"),
                startAfter(lastVisibleRecords[currentPage - 2]),
                limit(10));
            unsub = onSnapshot(next, (snapshot: QuerySnapshot<DocumentData>) => {
                const iscollectionEmpty = snapshot.size === 0
                if (!iscollectionEmpty) {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1]
                    const Doc = snapshot.docs.map((fonts) => ({ ...fonts.data(), id: fonts.id }))
                    setFont(Doc)
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

    const coloum = [

        {
            name: "",
            cell: (row: any) =>
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
            name: "Preview",
            selector: (a: any) => <div style={{ fontFamily: a.originalName }}>Abcdef</div>,
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


    const strlength = filterText.length;
    const strFrontCode = filterText.slice(0, strlength - 1);
    const strEndCode = filterText.slice(strlength - 1, filterText.length);
    const endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    useDidMountEffect(() => {
        const q = query(fontsCollectionRef, where("fontName", ">=", filterText), where("fontName", "<", endcode), limit(10));
        const unsub = onSnapshot(q, (snapshot: any) => {
            const Doc = snapshot.docs.map((fonts: any) => ({ ...fonts.data(), id: fonts.id }))
            setFont(Doc)
            setLoading(false)
            const lastVisible = snapshot.docs[snapshot.docs.length - 1]
            setlastVisibleRecords([lastVisible])
        })

        return () => unsub()
    }, [filterText])



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
                progressPending={fetchNext}
                paginationServer
                paginationComponentOptions={{ noRowsPerPage: true }}
                subHeader
                subHeaderComponent={<SubHeaderComponent filterText={filterText} setFilterText={setFilterText} />}
                onChangePage={handlePageChange}
                paginationTotalRows={numberOfRows}
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
