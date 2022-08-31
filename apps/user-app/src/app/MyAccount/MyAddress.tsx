import { Box, Button, ButtonGroup, Card, Typography } from '@mui/material';
import React from 'react';
import address from './images/address.svg';
export default function MyAddress() {
  
  return (
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit md:p-10">
      <Card className="px-5  min-h-screen">
        <div className="flex justify-center align-middle mt-10">
          <img src={address} alt="addressss" />
          <Typography variant="h5" className="mx-4 font-semibold">
            Your Address
          </Typography>
        </div>

        <Box className="my-10 flex justify-center ">
          <div className="flex ">
            <div className="">Address 1</div>
            <Card className="py-10 text-center mx-10 w-96 px-20 ">
              <Typography variant="h5" className="mx-4 font-medium text-lg">
                Vikas colony, in front of prashashkiya bhavan,
                mangaon,MAHARASHTRA, 402104, India
              </Typography>
              <ButtonGroup className="mt-10">
                <Button className="outline-none">Edit</Button>{' '}
                <Button>Delete</Button>
              </ButtonGroup>
            </Card>
          </div>
        </Box>
      </Card>
    </div>
  );
}
