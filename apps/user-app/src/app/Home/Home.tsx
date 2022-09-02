import SimpleModal from '@dropout-store/simple-modal'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import NewsLetter from '../news-letter/news-letter'

export const Home = () => {
  return (
      <div>
          <img src="../../assets/HomeBanner.png" alt="Banner" width="100%"/>
          <div className='grid md:grid-cols-8  bg-[#E5E5E5] -m-1'>
              <div className='col-span-2 bg-[#161C33] text-white text-center p-2 flex justify-center'>
                  <Typography className='hover:underline cursor-pointer'>Create Now</Typography>
                  <img src="../../assets/right.svg" alt="" className='pt-1'/>
              </div>
              <div className='text-center p-2'>
                  <Typography className='hover:underline cursor-pointer'>Tops</Typography>
            </div>
              <div className='text-center p-2'>
                  <Typography className='hover:underline cursor-pointer'>Bottoms</Typography>
            </div>
              <div className='text-center p-2'>
                  <Typography className='hover:underline cursor-pointer'>Hoodies</Typography>
            </div>
              <div className='text-center p-2'>
                  <Typography className='hover:underline cursor-pointer'>Merch</Typography>
            </div>
          </div>
          <div className='m-16 text-center'>
              <Typography className='text-gray-500 m-10' fontWeight={500} variant='h4'>Tshirts</Typography>
              <div className='grid md:grid-cols-2'>
                  <div>
                      <img src="../../assets/Group 47.png" alt="" width="80%" />
                  </div>
                  <div>
                      <img src="../../assets/Group 52.png" alt="" width="80%"/>
                  </div>
              </div>
          </div>
          <div className='m-16 text-center'>
              <Typography className='text-gray-500 m-10' fontWeight={500} variant='h4'>Bottoms</Typography>
              <div className='grid md:grid-cols-2'>
                  <div>
                      <img src="../../assets/Frame 170.png" alt="" width="80%" />
                  </div>
                  <div>
                      <img src="../../assets/Frame 171.png" alt="" width="80%" />
                  </div>
              </div>
          </div>
          <div className='m-16 text-center'>
              <Typography className='text-gray-500 m-10' fontWeight={500} variant='h4'>Hoodies</Typography>
              <div className='grid md:grid-cols-2'>
                  <div>
                      <img src="../../assets/Frame 166.png" alt="" width="80%" />
                  </div>
                  <div>
                      <img src="../../assets/Frame 167.png" alt="" width="80%" />
                  </div>
              </div>
          </div>
          <NewsLetter/>
    </div>
  )
}
