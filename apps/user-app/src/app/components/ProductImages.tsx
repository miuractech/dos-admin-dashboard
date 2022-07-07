import { Box, Skeleton, useTheme } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { db } from '../../configs/firebaseConfig'
import { setProduct } from '../../store/product'
import { RootState } from '../../store/store'

export const ProductImages = () => {
    const { resellerid, productid } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { product } = useSelector((state: RootState) => state.product)
    const [allImages, setAllImages] = useState<string[] | null>(null)

    useEffect(() => {
        if (!product) return
        const images = product.sideImages
        const sides = ["Front", "Right", "Left", "Back", "Top", "Bottom"]
        const array: any[] = []
        const frontImages = images.find(img => img.sideName === "Front")?.url
        images.forEach(img => {
            const find = images.find((img, index) => img.sideName === sides[index])
            console.log(find);
            array.push(find)
        })
    }, [product])

    useEffect(() => {
        if (!product) {
            getSellerProduct()
        }
    }, [productid, resellerid])

    const getSellerProduct = async () => {
        if (!resellerid) return
        if (!productid) return
        const docRef = doc(db, "reSellers", resellerid, "products", productid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch(setProduct(docSnap.data()))
            // console.log(docSnap.data()['sideImages']);
        } else {
            navigate("/")
        }
    }

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {product && product.sideImages.map((img, index) => (
                    <div key={img.sideName}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: "block",
                                    overflow: "hidden",
                                    width: "100%"
                                }}
                                src={img.url}
                                alt={img.sideName}
                            />
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
        </Box>
    );
}
