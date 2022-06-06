import React, { useEffect, useState } from 'react'
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
import { setProducts, setProduct } from '../store/designerSlice'
import { db } from '../../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

export interface CreatedAt {
    nanoseconds: number;
    seconds: number;
}

export interface sides {
    height: number;
    previewScreen: string;
    type: string;
    y: number;
    image: string;
    strokeWidth: number;
    stroke: string;
    width: number;
    dash: number[];
    fill: string;
    x: number;
}

export type side = {
    [sideName in 'front' | 'back' | "right" | "left" | "top" | "bottom"]: sides
}

export interface SideImage {
    [color: string]: side;
}

export interface size {
    [size: string]: string;
}

export interface Sku {
    [color: string]: { [size: string]: string };
}

export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface Color {
    colorName: string;
    colorCode: string;
}

export interface RootObject {
    subcategoryId: string;
    status: string;
    displayImage: string;
    categoryId: string;
    id: string;
    createdBy: string;
    createdAt: CreatedAt;
    sideImages: SideImage;
    sku: Sku;
    basePrice: number;
    updatedAt: UpdatedAt;
    color: Color[];
    description: string;
    familyId: string;
    index: number;
    name: string;
    size: string[];
    updatedBy: string;
}


type Props = {
    open: boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
}

export default function SelectProduct({ open, onClose }: Props) {
    const dispatch = useAppDispatch()
    const docRef = collection(db, "meta", "products", "product_type");
    const [products, setproducts] = useState<RootObject[]>([])

    useEffect(() => {
        product()
    }, [])

    const product = async () => {
        try {
            const docSnap = await getDocs(docRef);
            setproducts(docSnap.docs.map((product: any) => product.data()))
            dispatch(setProducts(docSnap.docs.map((product: any) => product.data())))
            dispatch(setProduct(docSnap.docs.map((product: any) => product.data())[0]))
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <SimpleModal
            open={open}
            onClose={onClose}

        >
            <div>
                <br />
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={12} md={3} className='pointer-cursor' style={{ borderRadius: 8 }} key={product.id} >
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
                                    image={product.displayImage}
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

// export type productSideType = {
//     img: string,
//     side: string
// }

// export type productVariantType = {
//     sides: Array<productSideType>,
//     color: string,
//     colorCode: string,

// }

// export type productType = {
//     name: string,
//     dp: string,
//     variants: Array<productVariantType>

// }

// const products: Array<productType> = [
//     {
//         name: 'T-Shirt',
//         dp: tshirtGreyFrontImg,
//         variants: [
//             {
//                 color: 'grey',
//                 colorCode: '#e5e5e5',
//                 sides: [
//                     {
//                         side: 'Front',
//                         img: tshirtGreyFrontImg,
//                     },
//                     {
//                         side: 'Back',
//                         img: tshirtGreyBackImg,
//                     },
//                     {
//                         side: 'Left',
//                         img: tshirtGreyLeftImg,
//                     },
//                     {
//                         side: 'Right',
//                         img: tshirtGreyRightImg,
//                     },
//                 ],

//             },
//             {
//                 color: 'black',
//                 colorCode: '#000',
//                 sides: [
//                     {
//                         side: 'Front',
//                         img: tshirtBlackFrontImg,
//                     },
//                     {
//                         side: 'Back',
//                         img: tshirtBlackBackImg,
//                     },
//                     {
//                         side: 'Left',
//                         img: tshirtBlackLeftImg,
//                     },
//                     {
//                         side: 'Right',
//                         img: tshirtBlackRightImg,
//                     },
//                 ],

//             }
//         ]
//     },
//     {
//         name: 'Hoodie',
//         dp: hoodieGreyFrontImg,
//         variants: [
//             {
//                 color: 'grey',
//                 colorCode: '#e5e5e5',

//                 sides: [
//                     {
//                         side: 'Front',
//                         img: hoodieGreyFrontImg,
//                     },
//                     {
//                         side: 'Back',
//                         img: hoodieGreyBackImg,
//                     },
//                     {
//                         side: 'Left',
//                         img: hoodieGreyLeftImg,
//                     },
//                     {
//                         side: 'Right',
//                         img: hoodieGreyRightImg,
//                     },
//                 ],

//             },
//             {
//                 color: 'black',
//                 colorCode: '#000',
//                 sides: [
//                     {
//                         side: 'Front',
//                         img: hoodieBlackFrontImg,
//                     },
//                     {
//                         side: 'Back',
//                         img: hoodieBlackBackImg,
//                     },
//                     {
//                         side: 'Left',
//                         img: hoodieBlackLeftImg,
//                     },
//                     {
//                         side: 'Right',
//                         img: hoodieBlackRightImg,
//                     },
//                 ],

//             }
//         ]
//     },

// ]