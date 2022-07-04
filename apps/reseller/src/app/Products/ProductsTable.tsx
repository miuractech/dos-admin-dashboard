import { Chip, Typography } from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebaseConfig/config';
import { ProductsObject } from '../../redux-tool/products';
import { RootState } from '../../redux-tool/store';

export const ProductsTable = ({ filteredData }: { filteredData: ProductsObject[] | null }) => {
    const { queriedListings } = useSelector((state: RootState) => state.listings)
    console.log("query", queriedListings);

    const columns = [
        {
            name: <Typography style={{ color: "#3c3c43" }} fontWeight={600}></Typography>,
            cell: (data: ProductsObject) => {
                const findFrontImg = data.sideImages[3].url
                return (
                    <div style={{ width: "50px" }}>
                        <img src={findFrontImg} alt="Img" width="100%" />
                    </div>
                )
            }
        },
        {
            name: <Typography style={{ color: "#3c3c43" }} fontWeight={600}>Product</Typography>,
            cell: (data: ProductsObject) => <Typography style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}>{data.productName}</Typography>,
        },
        {
            name: <Typography style={{ color: "#3c3c43" }} fontWeight={600}>Status</Typography>,
            cell: (data: ProductsObject) => {
                switch (data.status) {
                    case "active":
                        return <Chip label="Active" color="success" size='small' style={{ width: "70px" }} />
                    case "inactive":
                        return <Chip label="Inactive" color="error" size='small' style={{ width: "70px" }} />
                    case "archived":
                        return <Chip label="Archived" color="warning" size='small' style={{ width: "70px" }} />
                    default:
                        return <>dfh</>
                }
            }
        },
    ]

    return (
        <div>
            {queriedListings && <div>
                <DataTable
                    data={queriedListings}
                    columns={columns}
                    customStyles={customStyles}
                    pagination
                    selectableRows
                />
            </div>}
        </div>
    )
}

const customStyles = {
    rows: {
        style: {
            minHeight: '70px',
        },
    },
    headCells: {
        style: {
            textAlign: "center",
        },
    },
    cells: {
        style: {
            textAlign: "center",
        },
    },
};


