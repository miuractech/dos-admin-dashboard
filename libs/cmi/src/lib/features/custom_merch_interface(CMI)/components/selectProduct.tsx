import React, { useEffect } from 'react'
import { SimpleModal } from '../ui-components/modal'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'


//grey tshirt images
import tshirtGreyLeftImg from '../img/tshirt-grey-left.png';
import tshirtGreyRightImg from '../img/tshirt-grey-right.png';
import tshirtGreyFrontImg from '../img/tshirt-grey-front.png';
import tshirtGreyBackImg from '../img/tshirt-grey-back.png';

//black tshirt images
import tshirtBlackLeftImg from '../img/tshirt-black-left.png';
import tshirtBlackRightImg from '../img/tshirt-black-right.png';
import tshirtBlackFrontImg from '../img/tshirt-black-front.png';
import tshirtBlackBackImg from '../img/tshirt-black-back.png';

//grey hoodie images
import hoodieGreyLeftImg from '../img/hoodie-grey-left.png';
import hoodieGreyRightImg from '../img/hoodie-grey-right.png';
import hoodieGreyFrontImg from '../img/hoodie-grey-front.png';
import hoodieGreyBackImg from '../img/hoodie-grey-back.png';

//black hoodie images
import hoodieBlackLeftImg from '../img/hoodie-black-left.png';
import hoodieBlackRightImg from '../img/hoodie-black-right.png';
import hoodieBlackFrontImg from '../img/hoodie-black-front.png';
import hoodieBlackBackImg from '../img/hoodie-black-back.png';
import { } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { setProduct } from '../store/designerSlice'

type Props = {
    open: boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
}

export default function SelectProduct({ open, onClose }: Props) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setProduct(products[0]))
    }, [])

    return (
        <SimpleModal
            open={open}
            onClose={onClose}

        >
            <div>
                <br />
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={12} md={3} className='pointer-cursor' style={{ borderRadius: 8 }} key={product.name} >
                            <Card
                                elevation={0}
                                onClick={() => {
                                    dispatch(setProduct(product))
                                    onClose()
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    // height="194"
                                    image={product.dp}
                                    alt={product.name}
                                />
                                <div>
                                    {product.name}
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>

        </SimpleModal>
    )
}

export type productSideType = {
    img: string,
    side: string
}

export type productVariantType = {
    sides: Array<productSideType>,
    color: string,
    colorCode: string,

}

export type productType = {
    name: string,
    dp: string,
    variants: Array<productVariantType>

}

const products: Array<productType> = [
    {
        name: 'T-Shirt',
        dp: tshirtGreyFrontImg,
        variants: [
            {
                color: 'grey',
                colorCode: '#e5e5e5',
                sides: [
                    {
                        side: 'Front',
                        img: tshirtGreyFrontImg,
                    },
                    {
                        side: 'Back',
                        img: tshirtGreyBackImg,
                    },
                    {
                        side: 'Left',
                        img: tshirtGreyLeftImg,
                    },
                    {
                        side: 'Right',
                        img: tshirtGreyRightImg,
                    },
                ],

            },
            {
                color: 'black',
                colorCode: '#000',
                sides: [
                    {
                        side: 'Front',
                        img: tshirtBlackFrontImg,
                    },
                    {
                        side: 'Back',
                        img: tshirtBlackBackImg,
                    },
                    {
                        side: 'Left',
                        img: tshirtBlackLeftImg,
                    },
                    {
                        side: 'Right',
                        img: tshirtBlackRightImg,
                    },
                ],

            }
        ]
    },
    {
        name: 'Hoodie',
        dp: hoodieGreyFrontImg,
        variants: [
            {
                color: 'grey',
                colorCode: '#e5e5e5',

                sides: [
                    {
                        side: 'Front',
                        img: hoodieGreyFrontImg,
                    },
                    {
                        side: 'Back',
                        img: hoodieGreyBackImg,
                    },
                    {
                        side: 'Left',
                        img: hoodieGreyLeftImg,
                    },
                    {
                        side: 'Right',
                        img: hoodieGreyRightImg,
                    },
                ],

            },
            {
                color: 'black',
                colorCode: '#000',
                sides: [
                    {
                        side: 'Front',
                        img: hoodieBlackFrontImg,
                    },
                    {
                        side: 'Back',
                        img: hoodieBlackBackImg,
                    },
                    {
                        side: 'Left',
                        img: hoodieBlackLeftImg,
                    },
                    {
                        side: 'Right',
                        img: hoodieBlackRightImg,
                    },
                ],

            }
        ]
    },

]