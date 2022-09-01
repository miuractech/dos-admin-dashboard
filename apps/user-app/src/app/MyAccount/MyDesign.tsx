import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import tshirt from './images/t-shirt.png';
import myDesign from './images/designe.svg';
export default function MyDesign() {
  return (
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit  md:p-10 ">
      <Card className="md:px-5">
        <div className="flex justify-center align-middle mt-10">
          <img src={myDesign} alt="myDesign" />
          <Typography variant="h5" className="mx-4 font-semibold">
            My Designs
          </Typography>
        </div>

        <Box className="my-10 ">
          <div className="w-4/5 flex-wrap m-auto grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-center align-middle justify-items-center ">
            {/* card  */}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>{' '}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>{' '}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>{' '}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>
          </div>
        </Box>
      </Card>
    </div>
  );
}
