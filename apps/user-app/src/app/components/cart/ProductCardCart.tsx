import { Card, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { AddCircleOutline, ArchiveOutlined, DeleteOutlineOutlined, RemoveCircleOutline } from '@mui/icons-material'

export const ProductCardCart = () => {
    const { cartProductList, localCart } = useSelector((state: RootState) => state.cart)
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    return (
        <Card>
            <div className='grid grid-cols-3 md:grid-cols-4'>
                <div className='p-2 self-center'>
                    <img src={cartProductList[0].product.sideImages[0].url} alt="img" className='w-24 md:w-40' />
                    <div className='flex justify-between items-center w-24 h-7 md:w-40'>
                        <RemoveCircleOutline className='text-red-600' />
                        <Typography>10</Typography>
                        <AddCircleOutline className='text-green-600' />
                    </div>
                </div>
                <div className='col-span-2 md:col-span-3'>
                    <div className='p-3 flex justify-between'>
                        <div>
                            <Typography>{cartProductList[0].product.productName}</Typography>
                            <Typography variant='caption'>size:{cartProductList[0].size}</Typography>
                            {/* <Typography variant='caption'>sold by:{cartProductList[0].product.}</Typography> */}
                        </div>
                        <div>
                            <Typography>₹{cartProductList[0].product.price}</Typography>
                            <Typography variant='caption' className='line-through'>₹{cartProductList[0].product.comparePrice}</Typography>
                        </div>
                    </div>
                </div>
            </div>
            {
                !media &&
                <div className='h-10 flex justify-around items-center ' style={{ borderTop: "1px solid  #d6d6c2" }}>
                    <button className='flex space-x-2 text-gray-500 cursor-pointer border-none bg-inherit'><ArchiveOutlined fontSize='small' /> <Typography variant='subtitle2'>Purchase it later</Typography></button>
                    <Divider orientation="vertical" flexItem />
                    <button className='flex space-x-2 text-gray-500 cursor-pointer border-none bg-inherit'><DeleteOutlineOutlined fontSize='small' /> <Typography variant='subtitle2'>Delete</Typography></button>
                </div>
            }
        </Card>
    )
}
