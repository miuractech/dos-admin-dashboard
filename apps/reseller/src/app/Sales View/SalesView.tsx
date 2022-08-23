import { Typography } from '@mui/material'
import React from 'react'
import Footer from '../Auth/footer/footer'
import { SalesViewTable } from './SalesViewTable'

export const SalesView = () => {
    return (
        <div className='max-w-7xl  mt-20'>
         lorem ipsum  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil ea architecto, corrupti magni temporibus ducimus, nam accusantium aliquam iusto in ab necessitatibus? Ipsa voluptas nobis nisi delectus tenetur ipsum?
         Veritatis, odit commodi dolor fugit corporis nemo sequi laboriosam rerum voluptate tempora a impedit dolore harum quisquam animi est! Doloribus pariatur recusandae ducimus nam repellendus nisi dolores nemo quidem quas?
         Atque voluptatum qui numquam nobis deserunt odio laudantium facere sint placeat aperiam voluptatem pariatur expedita hic eligendi aliquid non cumque velit, reiciendis voluptas. Beatae aliquam illum enim, error nihil saepe!
            <Typography variant='h4'>Orders</Typography>
            <div className='p-2 rounded-xl'><SalesViewTable /></div>
            <Footer/>
        </div>
    )
}
