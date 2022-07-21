import { Backdrop, Button, Card, CardMedia, CircularProgress, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux-tool/store'
import InputField from '../../UI/input-field/input-field'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
// import useStorage from './hooks/useStorage'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig/config'
import { setNotification } from '../../redux-tool/auth'

type Inputs = {
    productName: string,
    price: number,
    comparePrice: number
}

const schema = yup.object().shape({
    productName: yup.string().required('product name cannot be empty').min(3, "minimum of 3 characters required"),
    price: yup.number().positive().integer().required("price cannot be empty"),
    comparePrice: yup.number().positive().integer().required("compare price cannot be empty"),
}).required();

export const AddProduct = () => {

    const { designPreviewImages, product, selectedColor } = useSelector((state: RootState) => state.designer)
    const { User } = useSelector((state: RootState) => state.User)
    const navigate = useNavigate()
    const [price, setPrice] = useState<null | number>(null)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch()
    const storage = getStorage();
    useEffect(() => {
        if (designPreviewImages.length === 0) {
            navigate(-1) 
        }
    }, [])
    console.log('designPreviewImages', designPreviewImages);
    
    const dataURLtoBlob = (dataURL: string, img: any, productId: string) => {
        return new Promise((resolve, reject) => {
            return fetch(dataURL)
                .then(res => res.blob())
                .then(blob => {
                    const storageRef = ref(storage, `resellerProducts/${productId}/${uuidv4()}`);
                    uploadBytes(storageRef, blob).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((downloadURL) => {
                            resolve({ sideName: img.sideName, url: downloadURL })
                        })
                            .catch(err => reject(err))
                    })
                })
                .catch(err => reject(err))
        })
    }

    const onsubmit = async (data: Inputs) => {
        try {
            if (!User) return
            if (!product) return
            if (!selectedColor) return
            setLoading(true)
            const productId = uuidv4()
            const sideImages = []
            for (const img of designPreviewImages) {
                const targetImage = await dataURLtoBlob(img.url, img, productId)
                sideImages.push(targetImage)
            }
            await setDoc(doc(db, "reSellers", User.uid, "products", productId), {
                ...data,
                productId: productId,
                color: selectedColor.colorName,
                resellerId: User.uid,
                sizeAvailable: product.size,
                sku: product.sku[selectedColor.colorName],
                description:product.description,
                resellerDescription: "",
                subCategoryId: product.subcategoryId,
                categoryId: product.categoryId,
                basePrice: product.basePrice,
                sideImages: sideImages,
                familyId: product.familyId,
                status: "inactive",
                productTypeName: product.name
            });
            setLoading(false)
            dispatch(setNotification("Product added successfully"))
        } catch (error) {
            console.log(error);
        }
    }
    console.log(product)
    return (
        product &&
        <form onSubmit={handleSubmit(onsubmit)}>
            <div style={{ width: "90%", margin: "auto" }}>
                <Grid container justifyContent="space-between" paddingBottom={2}>
                    <Grid item> <Typography fontWeight={600} variant='h5'>Products</Typography></Grid>
                    <Grid item><Button variant='contained' color='error'>Add Products</Button></Grid>
                </Grid>
                <Card style={{
                    borderRadius: "15px",
                    padding: "30px 20px",
                    marginBottom: "30px"
                }}>
                    <Typography fontWeight={500}>Media</Typography>
                        <Grid container gap={2} margin={1}>
                            {designPreviewImages.map(img => <Grid key={img.sideName} item xs={12} m={1.8} lg={1.8}>
                                <Card >
                                    <img
                                        src={img.url}
                                        placeholder="side images"
                                        width="100%"
                                        alt=''
                                    />
                                    <Typography fontWeight={500} align="center">{img.sideName}</Typography>
                                </Card>
                            </Grid>)}
                        </Grid>
                    <Card style={{
                        borderRadius: "15px",
                        padding: "30px 20px",
                        marginBottom: "30px"
                    }}>
                        <Typography fontWeight={500}>Product name</Typography>
                        <InputField
                            placeholder="Product name"
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            forminput={{ ...register("productName") }}
                            error={Boolean(errors['productName'])}
                            helperText={errors['productName']?.message}
                        />
                        <Grid container spacing={2}>
                            <Grid xs={12} lg={6} item>
                                <Typography fontWeight={500}>Price</Typography>
                                <InputField
                                    type="number"
                                    placeholder="Price"
                                    fullWidth
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    forminput={{ ...register("price") }}
                                    error={Boolean(errors['price'])}
                                    helperText={errors['price']?.message}
                                />
                            </Grid>
                            <Grid xs={12} lg={6} item>
                                <Typography fontWeight={500}>Compare at Price</Typography>
                                <InputField
                                    type="number"
                                    placeholder="Price"
                                    fullWidth
                                    forminput={{ ...register("comparePrice") }}
                                    error={Boolean(errors['comparePrice'])}
                                    helperText={errors['comparePrice']?.message}
                                />
                            </Grid>
                            <Grid xs={12} lg={6} item>
                                <Typography fontWeight={500}>Cost per item</Typography>
                                <InputField disabled placeholder="Price" fullWidth value={product.basePrice} />
                            </Grid>
                            <Grid container xs={12} lg={6} item spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <Typography fontWeight={500}>Margin</Typography>
                                    <InputField disabled placeholder="Price" fullWidth value={`${price && ((((price - product.basePrice) / price) * 10000) / 100).toFixed(2)}% `} />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <Typography fontWeight={500}>Profit</Typography>
                                    <InputField disabled placeholder="Price" fullWidth value={price && price - product.basePrice} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                    <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "50px" }}>
                        <Button variant='outlined'>Cancel</Button>
                        <Button type='submit' variant='contained' disabled={loading}>Save</Button>
                    </div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Card>
                </div >
            </form>
    )
}
