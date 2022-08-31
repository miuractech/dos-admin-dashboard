import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import profile from './images/profile.svg';
export default function MyProfile() {
  return (
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit md:p-10">
      <Card className="px-5 ">
        <div className="flex justify-center align-middle mt-10">
          <img src={profile} alt="profile" />
          <Typography variant="h5" className="mx-4 font-semibold">
            Profile
          </Typography>
        </div>

        <Box className="my-10 flex justify-center ">
          <div className="">
            <div className="flex align-middle items-center my-5">
              <label htmlFor="name" className="mr-5">
                Name
              </label>
              <input type="text" className="md:w-80 w-60 h-6" />
            </div>   <div className="flex align-middle items-center my-5">
              <label htmlFor="email" className="mr-5">
                Email
              </label>
              <input type="text" className="md:w-80 w-60 h-6" />
            </div>   <div className="flex align-middle items-center my-5">
              <label htmlFor="name" className="mr-5">
                Mobile
              </label>
              <input type="text" className="md:w-80 w-60 h-6" />
            </div>   <div className="flex align-middle items-center my-5">
              <label htmlFor="name" className="mr-5">
                Gender
              </label>
              <input type="text" className="md:w-80 w-60 h-6 shadow" />
            </div>
          </div>
        </Box>
      </Card>
    </div>
  );
}
