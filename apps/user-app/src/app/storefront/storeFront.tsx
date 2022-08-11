import { Search } from '@mui/icons-material'
import { CircularProgress, Container, Grid, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../configs/firebaseConfig'
import { RootState } from '../../store/store'
import { setSellerProductsList, setStoreFrontDetails } from '../../store/storeFrontslice'
import ProgressiveImg from '../../UI/input-field/ProgressiveImg'
import { ErrorBoundary } from 'react-error-boundary'
import InputField from '../../UI/input-field/input-field'
import { ErrorFallback } from '../components/ErrorFallback'
import { setProduct } from '../../store/product'
const ProductsCard = React.lazy(() => import('../components/ProductsCard'));
const StoreFront = () => {

    const { resellerid } = useParams()
    const dispatch = useDispatch()
    const { storeFrontDetails, productsList } = useSelector((state: RootState) => state.storeFront)
    const navigate = useNavigate()
    const theme = useTheme();
    const media = useMediaQuery(theme.breakpoints.up('md'))

    useEffect(() => {
        if (storeFrontDetails) return
        getStoreFrontDetails()
        getSellersProducts()
    }, [resellerid])

    const getSellersProducts = async () => {
        if (!resellerid) return
        const docRef = collection(db, "reSellers", resellerid, "products")
        const docSnap = await getDocs(docRef);
        dispatch(setSellerProductsList(docSnap.docs.map(doc => ({ ...doc.data() }))))
    }

    const getStoreFrontDetails = async () => {
        if (!resellerid) return
        const docRef = doc(db, "reSellers", resellerid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch(setStoreFrontDetails(docSnap.data()))
        } else {
            navigate("/")
        }
    }

    return (
        storeFrontDetails && <div>
            <div style={{ position: "relative" }}>
                <ProgressiveImg loadingComponent={<Skeleton variant="rectangular" width="100%" />} src={storeFrontDetails.bannerUrl} alt="bannerImage" style={{ width: "100%" }} />
                <div id='circle' style={{ position: "absolute", right: "calc(50% - 60px)", overflow: "hidden", bottom: "-90px" }}>
                    <ProgressiveImg src={storeFrontDetails.profileUrl} alt="profileimage" style={{ width: "100%", height: "100%" }} loadingComponent={<Skeleton variant="circular" width="100%" height="100%"/>} />
                </div>
            </div>
            <div style={{ margin: "55px 55px 30px" }}>
                <Typography variant='h4' align='center'>{storeFrontDetails.storeName}</Typography>
            </div>
            <Container maxWidth="md">
                <div style={{
                    display: "grid", padding: "10px", gap: "10px", borderRadius: "5px", gridTemplate: media ? "repeat(2, 1fr)/repeat(2, 1fr)" : "1fr", justifyContent: "center", justifyItems: "center"
                }}>
                    {storeFrontDetails.selectedTemplate.map((grid) => <div
                        style={{ borderRadius: "10px", overflow: "hidden", gridColumn: media ? grid.gridColumn : grid.gridColumnMobile, gridRow: media ? grid.gridRow : grid.gridRowMobile, width: '100%' }}
                    >
                        <ProgressiveImg src={grid.img} alt="gridImage" style={{ width: "100%", height: "100%" }} loadingComponent={<Skeleton variant="rectangular" width="100%" height="100%" /> } />
                    </div>)}
                </div>
            </Container>
            <Container maxWidth="md" style={{ marginTop: "3%" }}>
                <div style={{ margin: "20px 0 20px", float: "right" }}>
                    <InputField iconend={<Search />} size='small' placeholder='Find designs or products' />
                </div>
                {productsList && <Grid container spacing={4}>
                    {productsList.length > 0 ? (
                        productsList?.map(item =>
                            <div onClick={() => dispatch(setProduct(item))}>
                                <Grid key={item.productId} item xs={12} sm={6} md={4} lg={4}>
                                    <Link to={`/shops/${resellerid}/products/${item.productId}`}>
                                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                                            <Suspense fallback={() => <div>loading...</div>}>
                                                <ProductsCard productName={item.productName} images={item.sideImages} sizeArray={item.sizeAvailable} comparedPrice={item.comparePrice} price={item.price} />
                                            </Suspense>
                                        </ErrorBoundary>
                                    </Link>
                                </Grid>
                            </div>
                        )
                    ) : (<>no products</>)}
                </Grid>}
            </Container>
        </div >
    )
}

export default StoreFront