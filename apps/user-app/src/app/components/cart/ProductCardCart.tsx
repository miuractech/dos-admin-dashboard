import { Card, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { AddCircleOutline, ArchiveOutlined, DeleteOutlineOutlined, RemoveCircleOutline } from '@mui/icons-material'
import right from './assets/right.svg'
import { useNavigate } from 'react-router-dom'

type CardProductType = {
    img: string,
    productName: string,
    productSize: string,
    productPrice: number,
    productCompPrice: number,
    count: number,
    setCount: (id: string, productid: string, productSize: string) => void,
    productid: string
    id: string
    saveLater: (id: string) => void
    delectProduct: (id: string) => void
    reSellerId: string
}

export const ProductCardCart = ({ reSellerId, delectProduct, saveLater, id, img, productName, productSize, productPrice, productCompPrice, count, setCount, productid }: CardProductType) => {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    const navigate = useNavigate()
    return (
        <Card>
            <div className='md:py-5 md:px-10 p-2 flex space-x-5'>
                <div className=''>
                    <img src={img} alt="img" className='w-24 md:w-40' />
                    <div className='flex justify-between items-center w-24 h-7 md:w-40'>
                        <IconButton id='dec' onClick={(e) => setCount(e.currentTarget.id, productid, productSize)}>
                            <RemoveCircleOutline className='text-red-600' />
                        </IconButton>
                        <Typography fontWeight={600}>{count}</Typography>
                        <IconButton id="inc" onClick={(e) => setCount(e.currentTarget.id, productid, productSize)}>
                            <AddCircleOutline className='text-green-600' />
                        </IconButton>
                    </div>
                </div>
                <div className='flex w-full flex-col justify-between'>
                    <div className='px-3 md:flex justify-between flex-wrap gap-3'>
                        <div className='w-36 md:w-60'>
                            <div onClick={() => navigate(`/shops/${reSellerId}/products/${productid}`)}>
                                <Typography className='text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer hover:underline font-bold'>{productName}</Typography>
                            </div>
                            <Typography variant='caption'>size:{productSize}</Typography>
                        </div>
                        <div>
                            <Typography fontWeight={600}>₹{productPrice}</Typography>
                            <Typography variant='caption' className='line-through'>₹{productCompPrice}</Typography>
                        </div>
                    </div>
                    <div className='px-3 hidden sm:flex justify-between items-end flex-wrap gap-3'>
                        <div>
                            <Typography variant='subtitle2' fontWeight={600} className='text-green-600'>IN STOCK</Typography>
                            <Typography variant='subtitle2'>Free Delivery</Typography>
                        </div>
                        <div className='flex'>
                            <button onClick={() => delectProduct(id)} className='border-none bg-inherit cursor-pointer hover:underline text-base'>Delete</button>
                            <Divider orientation="vertical" flexItem />
                            <div className='flex'>
                                <button onClick={() => saveLater(id)} className='border-none bg-inherit cursor-pointer text-blue-500 text-base'>Purchase it later</button>
                                <img src={right} alt='arrow' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!media && <div className='h-10 flex justify-around items-center sm:hidden' style={{ borderTop: "1px solid  #d6d6c2" }}>
                <button onClick={() => saveLater(id)} className='flex space-x-2 text-gray-500 cursor-pointer border-none bg-inherit'><ArchiveOutlined fontSize='small' /> <Typography variant='subtitle2'>Purchase it later</Typography></button>
                <Divider orientation="vertical" flexItem />
                <button onClick={() => delectProduct(id)} className='flex space-x-2 text-gray-500 cursor-pointer border-none bg-inherit'><DeleteOutlineOutlined fontSize='small' /> <Typography variant='subtitle2'>Delete</Typography></button>
            </div>}
        </Card>
    )
}
