import { Card, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SideImageType } from '../../store/storeFrontslice'
import ProgressiveImg from '../../UI/input-field/ProgressiveImg'

type productTypes = {
    productName: string,
    images: SideImageType[],
    sizeArray: string[],
    comparedPrice: number,
    price: number
}

const ProductsCard = ({ productName, images, sizeArray, comparedPrice, price }: productTypes) => {
    const frontImages = images.find(img => img.sideName === "Front")?.url
    const [img, setImg] = useState(frontImages)
    const [over, setOver] = useState(false)

    useEffect(() => {
        let interval: any;
        if (over) {
            let count = 0
            const countofImages = images.length
            interval = setInterval(() => {
                const nextImg = images[count].url
                setImg(nextImg)
                if (count < countofImages - 1) {
                    count++
                } else {
                    count = 0
                }
            }, 1000)
        } else {
            clearInterval(interval)
            setImg(frontImages)
        }
        return () => clearInterval(interval)

    }, [frontImages, images, over])

    return (
        <div onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)} className='card' style={{ width: "250px", cursor: "pointer", margin: 'auto' }}>
            <div >
                {over ? (
                    img && <img src={img} alt="alt" style={{ width: "100%" }} />
                ) : (
                    <ProgressiveImg loadingComponent={<Skeleton variant="rectangular" width="250px" height="250px" />} src={img} alt="alt" style={{ width: "100%" }} />
                )}
            </div>
            <div style={{ display: "grid", gridTemplate: "1.5fr 1fr/3fr 1fr", padding: "10px 30px", border: "1px solid #DCDCDC" }}>
                <Typography variant='body2' fontWeight={600} style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>{productName}</Typography>
                <Typography color="secondary" variant='h6' fontWeight={600} style={{
                    justifySelf: "right", overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>₹{price}</Typography>
                <div style={{ display: "flex", gap: "5px", alignItems: 'center' }}>
                    <div>
                        <Typography variant='caption' >sizes:</Typography>
                    </div>
                    <div>
                        {sizeArray.map((size, index) => <Typography key={index} variant='caption' alignSelf="end" style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}>{size},</Typography>)}
                    </div>
                </div>
                <Typography
                    color={'GrayText'}
                    variant='caption'
                    style={{
                        textDecoration: "line-through", justifySelf: "right", overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>₹{comparedPrice}</Typography>
            </div>
        </div >
    )
}

export default ProductsCard
