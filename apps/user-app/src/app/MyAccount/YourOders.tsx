import { Box, Button, Card, Tab, Tabs, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React, { useEffect, useState } from 'react';
import order from './images/order.svg';
import orderImg from './images/orderedItemImg.svg';
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
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit md:p-10">
      <Card className="px-5">
        <div className="flex justify-center align-middle mt-10">
          <img src={order} alt="order" />
          <Typography variant="h5" className="mx-4 font-semibold">
            Your Order
          </Typography>
        </div>

        <Box className="my-10">
          <TabContext value={value}>
            <Box className="flex justify-center">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Current Orders"
                  value="1"
                  className="text-gray-600"
                />
                <Tab label="Past Orders" value="2" className="text-gray-600" />
              </TabList>
            </Box>
            <TabPanel className="my-10 overflow-y-auto h-full p-0" value="1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-5 pb-10 px-2">
                {/* card  */}
                {yourOrders.items &&
                  yourOrders.items.map((item: any) => (
                    <Card className="flex px-4 py-4">
                      <img
                        src={item.img}
                        alt=""
                        className="object-contain w-40 h-52 "
                      />

                      <div className="mx-5">
                        <Typography className="" variant="h6">
                          {item.productName}
                        </Typography>
                        <Typography className="my-5">
                          Order placed on:{' '}
                          <span className="font-semibold"> 21 / 12 / 2022</span>{' '}
                        </Typography>
                        <Typography className="my-5">
                          Delivery Address:{' '}
                          <span className="font-semibold">
                            {yourOrders.address.city} -{' '}
                            {yourOrders.address.pincode},{' '}
                            {yourOrders.address.country}
                          </span>
                        </Typography>
                        <div className="flex">
                          <Button variant="contained">Track Order</Button>
                        </div>
                      </div>

                    </Card>
                  ))}{' '}
              </div>
            </TabPanel>
            <TabPanel className="my-10" value="2">
              <div className="grid grid-cols-2 gap-4">
                {/* card  */}
                {yourOrders.items &&
                  yourOrders.items.map((item: any) => (
                    <Card className="flex h-52">
                      <img
                        src={item.img}
                        alt=""
                        className="object-contain  h-full"
                      />

                      <div className="mx-5">
                        <Typography className="" variant="h6">
                          {item.productName}
                        </Typography>
                        <Typography className="my-5">
                          Order placed on:{' '}
                          <span className="font-semibold"> 21 / 12 / 2022</span>{' '}
                        </Typography>
                        <Typography className="my-5">
                          Delivery Address:{' '}
                          <span className="font-semibold">
                            {yourOrders.address.city} -{' '}
                            {yourOrders.address.pincode},{' '}
                            {yourOrders.address.country}
                          </span>
                        </Typography>
                        <div className="flex">
                          <Button variant="contained">Track Order</Button>
                        </div>
                      </div>
                    </Card>
                  ))}{' '}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </div>
  );
}
