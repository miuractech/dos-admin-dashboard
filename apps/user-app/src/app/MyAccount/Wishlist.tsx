import { Box, Button, Card, Tab, Tabs, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import fav from './images/fav.svg';

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
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit p-10">
      <Card className="px-5">
        <div className="flex justify-center align-middle mt-10">
          <img src={fav} alt="order" />
          <Typography variant="h5" className="mx-4 font-semibold">
            WishList
          </Typography>
        </div>

        <Box className="my-10">
          <div className="grid grid-cols-3 gap-8 items-center align-middle justify-items-center ">
            {/* card  */}
            <div className="flex justify-center  px-10">
              <Card className="p-5 text-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/dropoutstore-8979d.appspot.com/o/resellerProducts%2F129ed9d5-5772-4f7a-9071-85067a392d40%2F1d7666f6-5f53-4e3a-b8d7-2b3a0fb13bd4?alt=media&token=3f86e7a4-0f41-48ff-832d-0682ddd2c265"
                  alt=""
                  className="object-cov w-60 h-60   "
                />
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
