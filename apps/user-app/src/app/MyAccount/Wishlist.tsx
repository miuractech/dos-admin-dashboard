import { Box, Button, Card, Tab, Tabs, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import fav from './images/fav.svg';
import tshirt from './images/t-shirt.png';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../configs/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function yourOrders() {
  const { user } = useSelector((state: RootState) => state.User);
  const [yourOrders, setyourOrders] = React.useState<any>([]);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('status', '==', 'success'),
      where('userId', '==', `${user?.uid}`)
    );

    const unsub = onSnapshot(q, (doc) => {
      console.log(doc.docs);
      const data = doc.docs.map((order) => ({ ...order.data() }));
      console.log(data);
      setyourOrders(data[0]);
    });
    return () => unsub();
  }, []);
  console.log(yourOrders.items);
  return (
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit  md:p-10 ">
      <Card className="md:px-5">
        <div className="flex justify-center align-middle mt-10">
          <img src={fav} alt="heart" />
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
