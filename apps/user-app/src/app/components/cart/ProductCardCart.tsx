import { Card, Divider, Typography } from '@mui/material'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { AddCircleOutline, ArchiveOutlined, DeleteOutlineOutlined, RemoveCircleOutline } from '@mui/icons-material'
import right from './right.svg'

type CardProductType = {
    img: string,
    productName: string,
    productSize: string,
    productPrice: number,
    productCompPrice: number,
    count: number
}

export const ProductCardCart = ({ img, productName, productSize, productPrice, productCompPrice, count }: CardProductType) => {
    return (
        <Card>
            <div className='md:py-5 md:px-10 flex space-x-5'>
                <div className=''>
                    <img src={img} alt="img" className='w-24 md:w-40' />
                    <div className='flex justify-between items-center w-24 h-7 md:w-40'>
                        <RemoveCircleOutline className='text-red-600' />
                        <Typography fontWeight={600}>{count}</Typography>
                        <AddCircleOutline className='text-green-600' />
                    </div>
                </div>
                <div className='flex w-full flex-col justify-between'>
                    <div className='p-3 md:flex justify-between flex-wrap gap-3'>
                        <div className='w-36 md:w-60'>
                            <Typography className='text-ellipsis whitespace-nowrap overflow-hidden'>{productName}</Typography>
                            <Typography variant='caption'>size:{productSize}</Typography>
                        </div>
                        <div>
                            <Typography fontWeight={600}>₹{productPrice}</Typography>
                            <Typography variant='caption' className='line-through'>₹{productCompPrice}</Typography>
                        </div>
                    </div>
                    <div className='p-3 hidden md:flex justify-between items-end flex-wrap gap-3'>
                        <div>
                            <Typography variant='subtitle2' fontWeight={600} className='text-green-600'>IN STOCK</Typography>
                            <Typography variant='subtitle2'>Free Delivery</Typography>
                        </div>
                        <div className='flex'>
                            <button className='border-none bg-inherit cursor-pointer hover:underline text-base'>Delete</button>
                            <Divider orientation="vertical" flexItem />
                            <div className='flex'>
                                <button className='border-none bg-inherit cursor-pointer text-blue-500 text-base'>Purchase it later</button>
                                <img src={right} alt='arrow' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-10 flex justify-around items-center md:hidden' style={{ borderTop: "1px solid  #d6d6c2" }}>
                <button className='flex space-x-2 text-gray-500 cursor-pointer border-none bg-inherit'><ArchiveOutlined fontSize='small' /> <Typography variant='subtitle2'>Purchase it later</Typography></button>
                <Divider orientation="vertical" flexItem />
                <button className='flex space-x-2 text-gray-500 cursor-pointer border-none bg-inherit'><DeleteOutlineOutlined fontSize='small' /> <Typography variant='subtitle2'>Delete</Typography></button>
            </div>
        </Card>
    )
}
