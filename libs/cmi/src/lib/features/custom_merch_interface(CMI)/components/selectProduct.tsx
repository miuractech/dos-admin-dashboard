import React, { useEffect, useState } from 'react'
import SimpleModal from '../ui-components/modal'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'


// //grey tshirt images
// import tshirtGreyLeftImg from '../img/tshirt-grey-left.png';
// import tshirtGreyRightImg from '../img/tshirt-grey-right.png';
// import tshirtGreyFrontImg from '../img/tshirt-grey-front.png';
// import tshirtGreyBackImg from '../img/tshirt-grey-back.png';

// //black tshirt images
// import tshirtBlackLeftImg from '../img/tshirt-black-left.png';
// import tshirtBlackRightImg from '../img/tshirt-black-right.png';
// import tshirtBlackFrontImg from '../img/tshirt-black-front.png';
// import tshirtBlackBackImg from '../img/tshirt-black-back.png';

// //grey hoodie images
// import hoodieGreyLeftImg from '../img/hoodie-grey-left.png';
// import hoodieGreyRightImg from '../img/hoodie-grey-right.png';
// import hoodieGreyFrontImg from '../img/hoodie-grey-front.png';
// import hoodieGreyBackImg from '../img/hoodie-grey-back.png';

// //black hoodie images
// import hoodieBlackLeftImg from '../img/hoodie-black-left.png';
// import hoodieBlackRightImg from '../img/hoodie-black-right.png';
// import hoodieBlackFrontImg from '../img/hoodie-black-front.png';
// import hoodieBlackBackImg from '../img/hoodie-black-back.png';
// import { } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { setProducts, setProduct } from '../store/designerSlice'
import { db } from '../../../config/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { resetObjects } from '../store/objects'
import AreYouSure from './AreYouSure'
import { Typography } from '@mui/material'

export interface CreatedAt {
    nanoseconds: number;
    seconds: number;
}

export interface baseSides {
    // previewScreen: string;
    imgUrl: string;
    // strokeWidth: number;
    // stroke: string;
    // dash: number[];
    // fill: string;
    y: number;
    x: number;
}

export interface rectSide extends baseSides {
    type: 'rect';
    height: number;
    width: number;
}

export interface circleSide extends baseSides {
    type: 'circle';
    radius: number;
}

export type side = {
    [sideName in 'Front' | 'Back' | "Right" | "Left" | "Top" | "Bottom"]: circleSide | rectSide
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
    // colorName: any
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
    selectedId?: boolean,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

export default function SelectProduct({ open, onClose, setSelectedId }: Props) {
    const dispatch = useAppDispatch()
    const docRef = query(collection(db, "meta", "products", "product_type"), orderBy("index"));
    const [products, setproducts] = useState<RootObject[]>([])
    const [sure, setSure] = useState<RootObject | null>(null)
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
                <Typography style={{ padding: "20px" }} variant="h6" align='center' fontWeight={500}>Choose Product</Typography>
                <Grid container spacing={2} padding="0 20px 20px">
                    {products.map((product) => (
                        <Grid item xs={12} md={3} style={{ borderRadius: 8 }} key={product.id} >
                            <Card
                                className='pointer-cursor'
                                style={{ padding: "20px" }}
                                elevation={3}
                                onClick={() => {
                                    setSure(product)
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    placeholder='Loading image...'
                                    loading='lazy'
                                    image={product.displayImage}
                                    alt={product.name}
                                />
                                <div>
                                    <Typography align='center' fontWeight={500}>{product.name}</Typography>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                    <div
                    >
                        <AreYouSure open={Boolean(sure)} onClose={() => setSure(null)} discard={() => {
                            dispatch(setProduct(sure))
                            dispatch(resetObjects())
                            setSelectedId(null)
                            onClose()
                            setSure(null)
                        }} text={'discard the Design?'} />
                    </div>
                </Grid>

            </div>

        </SimpleModal>
    )
}
